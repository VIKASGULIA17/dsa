/**
 * Represents a single step in an algorithm visualization
 */
export class VisualizationStep {
  constructor(stepNumber, action, data, narration, highlight = {}) {
    this.stepNumber = stepNumber;
    this.action = action; // e.g., 'compare', 'swap', 'visit', 'insert', etc.
    this.data = data; // Current state of the data structure
    this.narration = narration; // Human-readable explanation of what happened
    this.highlight = highlight; // Indices/elements to highlight
    this.timestamp = Date.now();
  }
}

/**
 * Result of an algorithm visualization
 */
export class VisualizationResult {
  constructor(algorithmName, steps, finalState, summary = '') {
    this.algorithmName = algorithmName;
    this.steps = steps;
    this.finalState = finalState;
    this.summary = summary;
    this.totalSteps = steps.length;
    this.executionTime = 0;
  }
}

/**
 * Represents a test case for code execution
 */
export class TestCase {
  constructor(id, input, expectedOutput, description = '') {
    this.id = id;
    this.input = input;
    this.expectedOutput = expectedOutput;
    this.description = description;
  }
}

/**
 * Result of a code execution attempt
 */
export class ExecutionResult {
  constructor(passed, output, error = '', stderr = '', verdict = 'PENDING') {
    this.passed = passed;
    this.output = output;
    this.error = error;
    this.stderr = stderr;
    this.verdict = verdict; // PASSED, FAILED, RUNTIME_ERROR, TIME_LIMIT_EXCEEDED, etc.
    this.executionTime = 0;
    this.memoryUsed = 0;
  }
}
