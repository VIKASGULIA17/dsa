import { CodeExecutionService } from '../services/CodeExecutionService.js';

// Create singleton instance
const executionService = new CodeExecutionService();

/**
 * Initialize test cases for a problem
 */
export function initializeTestCases(req, res, next) {
  try {
    const { problemId, testCases } = req.body;

    // Validation
    if (!problemId) {
      return res.status(400).json({ error: 'Missing required field: problemId' });
    }
    if (!Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ error: 'testCases must be a non-empty array' });
    }

    // Register test cases
    const tests = testCases.map(tc => 
      executionService.createTestCase(tc.id, tc.input, tc.expectedOutput, tc.description)
    );
    executionService.registerTestCases(problemId, tests);

    return res.status(200).json({
      success: true,
      message: `Registered ${tests.length} test cases for problem ${problemId}`,
      count: tests.length,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Execute code against test cases
 */
export async function executeCode(req, res, next) {
  try {
    const { code, problemId, language = 'javascript' } = req.body;

    // Validation
    if (!code) {
      return res.status(400).json({ error: 'Missing required field: code' });
    }
    if (!problemId) {
      return res.status(400).json({ error: 'Missing required field: problemId' });
    }

    // Execute code
    const result = await executionService.executeCode(code, problemId, language);

    return res.status(200).json({
      success: result.success,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Get test cases for a problem
 */
export function getTestCases(req, res, next) {
  try {
    const { problemId } = req.params;

    if (!problemId) {
      return res.status(400).json({ error: 'Missing required parameter: problemId' });
    }

    const testCases = executionService.getTestCases(problemId);

    return res.status(200).json({
      success: true,
      problemId,
      testCases,
      count: testCases.length,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Clear test cases for a problem
 */
export function clearTestCases(req, res, next) {
  try {
    const { problemId } = req.params;

    if (!problemId) {
      return res.status(400).json({ error: 'Missing required parameter: problemId' });
    }

    executionService.clearTestCases(problemId);

    return res.status(200).json({
      success: true,
      message: `Cleared test cases for problem ${problemId}`,
    });
  } catch (error) {
    return next(error);
  }
}
