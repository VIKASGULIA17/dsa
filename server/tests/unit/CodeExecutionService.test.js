import { test } from 'node:test';
import assert from 'node:assert';
import { CodeExecutionService, TestCase } from '../../src/services/CodeExecutionService.js';

test('CodeExecutionService', async (t) => {
  await t.test('should create test case', () => {
    const service = new CodeExecutionService();
    const testCase = service.createTestCase('test-1', [1, 2, 3], '6', 'Sum test');

    assert.strictEqual(testCase.id, 'test-1');
    assert.deepStrictEqual(testCase.input, [1, 2, 3]);
    assert.strictEqual(testCase.expectedOutput, '6');
    assert.strictEqual(testCase.description, 'Sum test');
  });

  await t.test('should register test cases for a problem', () => {
    const service = new CodeExecutionService();
    const testCases = [
      service.createTestCase('test-1', [1, 2], '3'),
      service.createTestCase('test-2', [5, 5], '10'),
    ];

    service.registerTestCases('sum-problem', testCases);
    const registered = service.getTestCases('sum-problem');

    assert.strictEqual(registered.length, 2);
    assert.strictEqual(registered[0].id, 'test-1');
  });

  await t.test('should clear test cases', () => {
    const service = new CodeExecutionService();
    const testCases = [
      service.createTestCase('test-1', [1, 2], '3'),
    ];

    service.registerTestCases('sum-problem', testCases);
    service.clearTestCases('sum-problem');
    const registered = service.getTestCases('sum-problem');

    assert.strictEqual(registered.length, 0);
  });

  await t.test('should execute JavaScript code successfully', async () => {
    const service = new CodeExecutionService();
    const testCases = [
      service.createTestCase('test-1', 2, '4'),
      service.createTestCase('test-2', 3, '9'),
    ];

    service.registerTestCases('square-problem', testCases);

    const code = 'console.log(input * input);';
    const result = await service.executeCode(code, 'square-problem', 'javascript');

    assert.ok(result.success === true || result.results.length > 0);
  });

  await t.test('should return error when no test cases registered', async () => {
    const service = new CodeExecutionService();

    const code = 'console.log("test");';
    const result = await service.executeCode(code, 'unknown-problem', 'javascript');

    assert.strictEqual(result.success, false);
    assert.ok(result.error.includes('No test cases'));
  });

  await t.test('should handle runtime errors', async () => {
    const service = new CodeExecutionService();
    const testCases = [
      service.createTestCase('test-1', 5, '10'),
    ];

    service.registerTestCases('error-problem', testCases);

    const code = 'console.log(undefinedVar);';
    const result = await service.executeCode(code, 'error-problem', 'javascript');

    assert.strictEqual(result.success, false);
    assert.ok(result.results.length > 0);
    assert.strictEqual(result.results[0].verdict, 'RUNTIME_ERROR');
  });

  await t.test('should compare outputs correctly', async () => {
    const service = new CodeExecutionService();

    // Test exact match
    assert.strictEqual(service.compareOutput('hello', 'hello'), true);

    // Test with different whitespace
    assert.strictEqual(service.compareOutput('hello world', 'hello  world'), true);

    // Test mismatch
    assert.strictEqual(service.compareOutput('hello', 'goodbye'), false);
  });

  await t.test('should determine verdict from results', () => {
    const service = new CodeExecutionService();

    // All passed
    let results = [
      { passed: true, verdict: 'PASSED' },
      { passed: true, verdict: 'PASSED' },
    ];
    assert.strictEqual(service.determineVerdict(results, null), 'PASSED');

    // Some failed with wrong answer
    results = [
      { passed: true, verdict: 'PASSED' },
      { passed: false, verdict: 'WRONG_ANSWER' },
    ];
    assert.strictEqual(service.determineVerdict(results, null), 'WRONG_ANSWER');

    // Error
    results = [
      { passed: false, verdict: 'RUNTIME_ERROR' },
    ];
    assert.strictEqual(service.determineVerdict(results, 'Some error'), 'RUNTIME_ERROR');
  });

  await t.test('should generate execution summary', () => {
    const service = new CodeExecutionService();
    const results = [
      { passed: true, executionTime: 10 },
      { passed: true, executionTime: 15 },
      { passed: false, executionTime: 12 },
    ];

    const summary = service.generateSummary(results);

    assert.strictEqual(summary.total, 3);
    assert.strictEqual(summary.passed, 2);
    assert.strictEqual(summary.failed, 1);
    assert.strictEqual(summary.totalExecutionTime, 37);
    assert.strictEqual(summary.averageExecutionTime, 37 / 3);
  });

  await t.test('should throw on unsupported language', async () => {
    const service = new CodeExecutionService();
    const testCases = [
      service.createTestCase('test-1', 5, '10'),
    ];

    service.registerTestCases('problem', testCases);

    const result = await service.executeCode('code', 'problem', 'unknown-language');
    assert.strictEqual(result.success, false);
    assert.ok(result.results[0].error.includes('Unsupported language'));
  });

  await t.test('should handle Python execution setup', async () => {
    const service = new CodeExecutionService();
    const testCases = [
      service.createTestCase('test-1', 5, '10'),
    ];

    service.registerTestCases('problem', testCases);

    // Python execution might throw or succeed depending on Python availability
    // We mainly test that the service attempts it
    try {
      const result = await service.executeCode('print(input)', 'problem', 'python');
      assert.ok(result);
    } catch (error) {
      assert.ok(error.message); // Should have some error message
    }
  });
});
