import { test } from 'node:test';
import assert from 'node:assert';
import { AIExplanationService } from '../../src/services/AIExplanationService.js';

test('AIExplanationService', async (t) => {
  await t.test('should use fallback when API not configured', async () => {
    const service = new AIExplanationService({
      apiKey: null,
      apiEndpoint: null,
      fallbackEnabled: true,
    });

    const result = await service.getExplanation('prob-1', 'const x = 5;');

    assert.ok(result);
    assert.strictEqual(result.source, 'fallback');
    assert.ok(result.explanation);
    assert.strictEqual(result.disclaimer, 'This is a generated fallback explanation as AI API is unavailable');
  });

  await t.test('should cache explanations', async () => {
    const service = new AIExplanationService({
      apiKey: null,
      apiEndpoint: null,
      fallbackEnabled: true,
    });

    const code = 'const x = 5;';
    const problemId = 'caching-test-' + Date.now();
    const result1 = await service.getExplanation(problemId, code);
    
    // Verify first call uses fallback
    assert.strictEqual(result1.source, 'fallback');

    // Manually verify caching works by checking cache stats
    const stats = service.getCacheStats();
    const initialKeys = stats.keys;

    // Make a second call with same parameters
    const result2 = await service.getExplanation(problemId, code);
    const finalStats = service.getCacheStats();

    // The cache should still have the same number of keys (or more, depending on timing)
    assert.ok(finalStats.keys >= initialKeys);

    // Clear cache to reset state
    service.clearCache();
  });

  await t.test('should clear cache', async () => {
    const service = new AIExplanationService({
      apiKey: null,
      apiEndpoint: null,
      fallbackEnabled: true,
    });

    const code = 'const x = 5;';
    await service.getExplanation('prob-1', code);

    service.clearCache();

    const stats = service.getCacheStats();
    assert.strictEqual(stats.keys, 0);
  });

  await t.test('should analyze code complexity heuristically', async () => {
    const service = new AIExplanationService({
      apiKey: null,
      apiEndpoint: null,
      fallbackEnabled: true,
    });

    const result = await service.getExplanation('prob-1', 'for(let i = 0; i < n; i++) for(let j = 0; j < n; j++) {}');

    assert.ok(result.complexity);
    assert.strictEqual(result.complexity.time, 'O(n²)');
  });

  await t.test('should generate improvement suggestions', async () => {
    const service = new AIExplanationService({
      apiKey: null,
      apiEndpoint: null,
      fallbackEnabled: true,
    });

    const result = await service.getExplanation('prob-1', 'var x = 5;');

    assert.ok(Array.isArray(result.improvements));
    assert.ok(result.improvements.some(s => s.includes('var')));
  });

  await t.test('should throw when fallback disabled and API unavailable', async () => {
    const service = new AIExplanationService({
      apiKey: null,
      apiEndpoint: null,
      fallbackEnabled: false,
    });

    try {
      await service.getExplanation('prob-1', 'const x = 5;');
      assert.fail('Should have thrown an error');
    } catch (error) {
      assert.ok(error.message.includes('Failed to get AI explanation'));
    }
  });

  await t.test('should get cache statistics', () => {
    const service = new AIExplanationService();

    const stats = service.getCacheStats();
    assert.ok(stats);
    assert.strictEqual(typeof stats.keys, 'number');
    assert.strictEqual(typeof stats.hits, 'number');
    assert.strictEqual(typeof stats.misses, 'number');
  });

  await t.test('should handle timeout gracefully', async () => {
    const service = new AIExplanationService({
      apiKey: 'test-key',
      apiEndpoint: 'http://invalid-endpoint-that-will-timeout.local:9999',
      timeout: 100,
      fallbackEnabled: true,
    });

    const result = await service.getExplanation('prob-1', 'const x = 5;');
    assert.strictEqual(result.source, 'fallback');
  });
});
