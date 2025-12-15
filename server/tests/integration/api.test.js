import { test } from 'node:test';
import assert from 'node:assert';
import http from 'http';

// Helper function to make HTTP requests
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            body: parsed,
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            body: data,
          });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

test('Health Check Endpoint', async (t) => {
  await t.test('should return health status', async () => {
    const response = await makeRequest('GET', '/health');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.status, 'ok');
  });
});

test('Visualizer API Endpoints', async (t) => {
  await t.test('POST /api/visualizer/run - TwoSum', async () => {
    const response = await makeRequest('POST', '/api/visualizer/run', {
      algorithm: 'TwoSum',
      input: {
        nums: [2, 7, 11, 15],
        target: 9,
      },
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(response.body.data);
    assert.strictEqual(response.body.data.algorithmName, 'Two Sum');
    assert.ok(Array.isArray(response.body.data.steps));
  });

  await t.test('POST /api/visualizer/run - MergeSort', async () => {
    const response = await makeRequest('POST', '/api/visualizer/run', {
      algorithm: 'MergeSort',
      input: {
        array: [64, 34, 25, 12, 22],
      },
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.data.algorithmName, 'Merge Sort');
  });

  await t.test('POST /api/visualizer/run - BFS', async () => {
    const response = await makeRequest('POST', '/api/visualizer/run', {
      algorithm: 'BFS',
      input: {
        graph: { 0: [1, 2], 1: [0, 2], 2: [0, 1, 3], 3: [2] },
        start: 0,
      },
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.data.algorithmName, 'BFS');
  });

  await t.test('GET /api/visualizer/algorithms', async () => {
    const response = await makeRequest('GET', '/api/visualizer/algorithms');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(Array.isArray(response.body.algorithms));
    assert.strictEqual(response.body.algorithms.length, 3);
  });

  await t.test('GET /api/visualizer/algorithms/:algorithm', async () => {
    const response = await makeRequest('GET', '/api/visualizer/algorithms/TwoSum');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(response.body.metadata);
    assert.strictEqual(response.body.metadata.name, 'Two Sum');
  });

  await t.test('POST /api/visualizer/run - missing algorithm', async () => {
    const response = await makeRequest('POST', '/api/visualizer/run', {
      input: { nums: [1, 2], target: 3 },
    });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.error);
  });

  await t.test('POST /api/visualizer/run - missing input', async () => {
    const response = await makeRequest('POST', '/api/visualizer/run', {
      algorithm: 'TwoSum',
    });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.error);
  });
});

test('AI Explanation API Endpoints', async (t) => {
  await t.test('POST /api/ai/explain', async () => {
    const response = await makeRequest('POST', '/api/ai/explain', {
      problemId: 'two-sum',
      code: 'const nums = [2, 7]; const target = 9;',
      language: 'javascript',
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(response.body.data);
    assert.ok(response.body.data.explanation);
  });

  await t.test('POST /api/ai/explain - caching', async () => {
    const payload = {
      problemId: 'test-problem',
      code: 'const x = 5;',
      language: 'javascript',
    };

    const res1 = await makeRequest('POST', '/api/ai/explain', payload);
    const res2 = await makeRequest('POST', '/api/ai/explain', payload);

    assert.strictEqual(res1.status, 200);
    assert.strictEqual(res2.status, 200);
    // Both should succeed and have explanations
    assert.ok(res1.body.data.explanation);
    assert.ok(res2.body.data.explanation);
    // The source should indicate it's either from fallback or cache/API
    assert.ok(['fallback', 'cache', 'api'].includes(res1.body.data.source));
  });

  await t.test('GET /api/ai/cache/stats', async () => {
    const response = await makeRequest('GET', '/api/ai/cache/stats');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(response.body.stats);
  });

  await t.test('POST /api/ai/cache/clear', async () => {
    const response = await makeRequest('POST', '/api/ai/cache/clear');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
  });

  await t.test('POST /api/ai/explain - missing problemId', async () => {
    const response = await makeRequest('POST', '/api/ai/explain', {
      code: 'const x = 5;',
    });

    assert.strictEqual(response.status, 400);
  });

  await t.test('POST /api/ai/explain - missing code', async () => {
    const response = await makeRequest('POST', '/api/ai/explain', {
      problemId: 'problem-1',
    });

    assert.strictEqual(response.status, 400);
  });
});

test('Code Execution API Endpoints', async (t) => {
  // Initialize test cases first
  await t.test('POST /api/execute/init-tests', async () => {
    const response = await makeRequest('POST', '/api/execute/init-tests', {
      problemId: 'square-test',
      testCases: [
        { id: 'test-1', input: 2, expectedOutput: '4' },
        { id: 'test-2', input: 3, expectedOutput: '9' },
      ],
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.count, 2);
  });

  await t.test('GET /api/execute/tests/:problemId', async () => {
    // First, initialize test cases
    await makeRequest('POST', '/api/execute/init-tests', {
      problemId: 'test-problem-1',
      testCases: [
        { id: 'test-1', input: 5, expectedOutput: '25' },
      ],
    });

    const response = await makeRequest('GET', '/api/execute/tests/test-problem-1');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(Array.isArray(response.body.testCases));
  });

  await t.test('POST /api/execute/run - JavaScript', async () => {
    // Initialize test cases
    await makeRequest('POST', '/api/execute/init-tests', {
      problemId: 'js-test',
      testCases: [
        { id: 'test-1', input: 2, expectedOutput: '4' },
      ],
    });

    const response = await makeRequest('POST', '/api/execute/run', {
      code: 'console.log(input * input);',
      problemId: 'js-test',
      language: 'javascript',
    });

    assert.strictEqual(response.status, 200);
    assert.ok(response.body.data);
    assert.ok(Array.isArray(response.body.data.results));
  });

  await t.test('DELETE /api/execute/tests/:problemId', async () => {
    // First, initialize test cases
    await makeRequest('POST', '/api/execute/init-tests', {
      problemId: 'problem-to-delete',
      testCases: [
        { id: 'test-1', input: 5, expectedOutput: '10' },
      ],
    });

    const response = await makeRequest('DELETE', '/api/execute/tests/problem-to-delete');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
  });

  await t.test('POST /api/execute/init-tests - missing problemId', async () => {
    const response = await makeRequest('POST', '/api/execute/init-tests', {
      testCases: [
        { id: 'test-1', input: 5, expectedOutput: '10' },
      ],
    });

    assert.strictEqual(response.status, 400);
  });

  await t.test('POST /api/execute/run - missing code', async () => {
    const response = await makeRequest('POST', '/api/execute/run', {
      problemId: 'problem-1',
    });

    assert.strictEqual(response.status, 400);
  });

  await t.test('POST /api/execute/run - missing problemId', async () => {
    const response = await makeRequest('POST', '/api/execute/run', {
      code: 'console.log("test");',
    });

    assert.strictEqual(response.status, 400);
  });
});

test('Error Handling', async (t) => {
  await t.test('should return 404 for unknown routes', async () => {
    const response = await makeRequest('GET', '/api/unknown-route');

    assert.strictEqual(response.status, 404);
    assert.ok(response.body.error);
  });

  await t.test('should handle invalid algorithm type', async () => {
    const response = await makeRequest('POST', '/api/visualizer/run', {
      algorithm: 'InvalidAlgorithm',
      input: {},
    });

    // Should return an error status (either 400 or 500)
    assert.ok(response.status >= 400);
    assert.ok(response.body.error);
  });
});
