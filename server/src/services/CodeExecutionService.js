import { exec } from 'child_process';
import { promisify } from 'util';
import { TestCase } from '../models/VisualizationStep.js';

const execAsync = promisify(exec);

// Export TestCase for convenience
export { TestCase };

/**
 * Code Execution Service
 * Executes submitted code against test cases with sandboxing
 */
export class CodeExecutionService {
  constructor(config = {}) {
    this.timeout = config.timeout || 5000; // milliseconds
    this.maxMemory = config.maxMemory || 256; // MB
    this.useDocker = config.useDocker !== false;
    this.dockerImage = config.dockerImage || 'node:18-alpine';
    this.testCases = new Map();
  }

  /**
   * Register test cases for a problem
   * @param {string} problemId - ID of the problem
   * @param {TestCase[]} testCases - Array of test cases
   */
  registerTestCases(problemId, testCases) {
    this.testCases.set(problemId, testCases);
  }

  /**
   * Execute code against test cases
   * @param {string} code - Code to execute
   * @param {string} problemId - ID of the problem
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Execution results
   */
  async executeCode(code, problemId, language = 'javascript') {
    const tests = this.testCases.get(problemId) || [];

    if (tests.length === 0) {
      return {
        success: false,
        error: `No test cases registered for problem ${problemId}`,
        results: [],
        verdict: 'NO_TEST_CASES',
      };
    }

    const results = [];
    let allPassed = true;
    let executionError = null;

    for (const testCase of tests) {
      try {
        const result = await this.runSingleTest(code, testCase, language);
        results.push(result);
        if (!result.passed) {
          allPassed = false;
        }
      } catch (error) {
        allPassed = false;
        executionError = error.message;
        results.push({
          testId: testCase.id,
          passed: false,
          output: '',
          error: error.message,
          stderr: error.stderr || '',
          verdict: 'RUNTIME_ERROR',
        });
      }
    }

    return {
      success: !executionError && allPassed,
      error: executionError,
      results,
      passed: results.filter(r => r.passed).length,
      total: results.length,
      verdict: this.determineVerdict(results, executionError),
      summary: this.generateSummary(results),
    };
  }

  /**
   * Run a single test case
   * @private
   */
  async runSingleTest(code, testCase, language) {
    const startTime = Date.now();

    try {
      let output;
      let stderr;

      if (language === 'javascript' || language === 'js') {
        ({ stdout: output, stderr } = await this.executeJavaScript(code, testCase));
      } else if (language === 'python') {
        ({ stdout: output, stderr } = await this.executePython(code, testCase));
      } else if (language === 'cpp' || language === 'c++') {
        ({ stdout: output, stderr } = await this.executeCpp(code, testCase));
      } else if (language === 'java') {
        ({ stdout: output, stderr } = await this.executeJava(code, testCase));
      } else {
        throw new Error(`Unsupported language: ${language}`);
      }

      const executionTime = Date.now() - startTime;
      const passed = this.compareOutput(output.trim(), testCase.expectedOutput.toString().trim());

      return {
        testId: testCase.id,
        description: testCase.description,
        passed,
        output: output.trim(),
        expected: testCase.expectedOutput,
        error: '',
        stderr: stderr.trim(),
        verdict: passed ? 'PASSED' : 'WRONG_ANSWER',
        executionTime,
      };
    } catch (error) {
      return {
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        output: '',
        expected: testCase.expectedOutput,
        error: error.message,
        stderr: error.stderr || '',
        verdict: error.verdict || 'RUNTIME_ERROR',
        executionTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Execute JavaScript code
   * @private
   */
  async executeJavaScript(code, testCase) {
    const wrappedCode = `
      const input = ${JSON.stringify(testCase.input)};
      ${code}
    `;

    const { stdout, stderr } = await execAsync(
      `node -e "${wrappedCode.replace(/"/g, '\\"')}"`,
      { timeout: this.timeout, maxBuffer: 10 * 1024 * 1024 }
    );

    return { stdout, stderr };
  }

  /**
   * Execute Python code
   * @private
   */
  async executePython(code, testCase) {
    const wrappedCode = `
import json
input_data = ${JSON.stringify(testCase.input)}
${code}
    `;

    const { stdout, stderr } = await execAsync(
      `python3 -c "${wrappedCode.replace(/"/g, '\\"')}"`,
      { timeout: this.timeout, maxBuffer: 10 * 1024 * 1024 }
    );

    return { stdout, stderr };
  }

  /**
   * Execute C++ code (basic version)
   * @private
   */
  async executeCpp(code, testCase) {
    // This is a simplified version - in production, you'd compile and run properly
    throw new Error('C++ execution requires Docker or a proper sandbox setup');
  }

  /**
   * Execute Java code (basic version)
   * @private
   */
  async executeJava(code, testCase) {
    // This is a simplified version - in production, you'd compile and run properly
    throw new Error('Java execution requires Docker or a proper sandbox setup');
  }

  /**
   * Compare output with expected value
   * @private
   */
  compareOutput(actual, expected) {
    // Normalize both strings
    const normalizeOutput = (output) => {
      return output.replace(/\s+/g, ' ').trim();
    };

    const actualNorm = normalizeOutput(actual);
    const expectedNorm = normalizeOutput(expected);

    return actualNorm === expectedNorm;
  }

  /**
   * Determine verdict from results
   * @private
   */
  determineVerdict(results, error) {
    if (error) {
      return 'RUNTIME_ERROR';
    }

    const failedResults = results.filter(r => !r.passed);
    if (failedResults.length === 0) {
      return 'PASSED';
    }

    const wrongAnswer = failedResults.find(r => r.verdict === 'WRONG_ANSWER');
    if (wrongAnswer) {
      return 'WRONG_ANSWER';
    }

    return failedResults[0].verdict || 'FAILED';
  }

  /**
   * Generate execution summary
   * @private
   */
  generateSummary(results) {
    const totalTime = results.reduce((sum, r) => sum + (r.executionTime || 0), 0);
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;

    return {
      total: results.length,
      passed,
      failed,
      totalExecutionTime: totalTime,
      averageExecutionTime: totalTime / results.length,
    };
  }

  /**
   * Create a test case
   */
  createTestCase(id, input, expectedOutput, description = '') {
    return new TestCase(id, input, expectedOutput, description);
  }

  /**
   * Get registered test cases
   */
  getTestCases(problemId) {
    return this.testCases.get(problemId) || [];
  }

  /**
   * Clear test cases for a problem
   */
  clearTestCases(problemId) {
    this.testCases.delete(problemId);
  }
}
