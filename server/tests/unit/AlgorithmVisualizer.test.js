import { test } from 'node:test';
import assert from 'node:assert';
import {
  TwoSumVisualizer,
  MergeSortVisualizer,
  BFSVisualizer,
  VisualizerFactory,
} from '../../src/services/AlgorithmVisualizer.js';

test('AlgorithmVisualizer - TwoSum', async (t) => {
  await t.test('should find two numbers that sum to target', () => {
    const visualizer = new TwoSumVisualizer();
    const result = visualizer.visualize({
      nums: [2, 7, 11, 15],
      target: 9,
    });

    assert.strictEqual(result.algorithmName, 'Two Sum');
    assert.ok(result.steps.length > 0);
    assert.deepStrictEqual(result.finalState.pairs, [0, 1]);
    assert.strictEqual(result.finalState.values[0] + result.finalState.values[1], 9);
  });

  await t.test('should handle case where no pair exists', () => {
    const visualizer = new TwoSumVisualizer();
    const result = visualizer.visualize({
      nums: [1, 2, 3],
      target: 10,
    });

    assert.strictEqual(result.finalState.pairs, null);
    assert.ok(result.steps.length > 0);
  });

  await t.test('should return metadata', () => {
    const visualizer = new TwoSumVisualizer();
    const metadata = visualizer.getMetadata();

    assert.strictEqual(metadata.name, 'Two Sum');
    assert.strictEqual(metadata.timeComplexity, 'O(n)');
    assert.strictEqual(metadata.spaceComplexity, 'O(n)');
  });

  await t.test('should throw on invalid input', () => {
    const visualizer = new TwoSumVisualizer();
    assert.throws(
      () => visualizer.visualize({ nums: 'not an array', target: 5 }),
      /Invalid input/
    );
  });
});

test('AlgorithmVisualizer - MergeSort', async (t) => {
  await t.test('should sort array using merge sort', () => {
    const visualizer = new MergeSortVisualizer();
    const unsorted = [64, 34, 25, 12, 22, 11, 90];
    const result = visualizer.visualize({ array: unsorted });

    assert.strictEqual(result.algorithmName, 'Merge Sort');
    assert.ok(result.steps.length > 0);
    const sorted = result.finalState.array;
    for (let i = 1; i < sorted.length; i++) {
      assert.ok(sorted[i - 1] <= sorted[i]);
    }
  });

  await t.test('should handle already sorted array', () => {
    const visualizer = new MergeSortVisualizer();
    const sorted = [1, 2, 3, 4, 5];
    const result = visualizer.visualize({ array: sorted });

    assert.deepStrictEqual(result.finalState.array, sorted);
  });

  await t.test('should return correct metadata', () => {
    const visualizer = new MergeSortVisualizer();
    const metadata = visualizer.getMetadata();

    assert.strictEqual(metadata.name, 'Merge Sort');
    assert.strictEqual(metadata.timeComplexity, 'O(n log n)');
    assert.strictEqual(metadata.spaceComplexity, 'O(n)');
  });
});

test('AlgorithmVisualizer - BFS', async (t) => {
  await t.test('should traverse graph in BFS order', () => {
    const visualizer = new BFSVisualizer();
    const graph = {
      0: [1, 2],
      1: [0, 2],
      2: [0, 1, 3],
      3: [2],
    };
    const result = visualizer.visualize({ graph, start: 0 });

    assert.strictEqual(result.algorithmName, 'BFS');
    assert.ok(result.steps.length > 0);
    const traversalOrder = result.finalState.traversalOrder;
    assert.ok(Array.isArray(traversalOrder));
    assert.strictEqual(traversalOrder[0], 0); // Start node should be first
  });

  await t.test('should visit all reachable nodes', () => {
    const visualizer = new BFSVisualizer();
    const graph = {
      0: [1, 2],
      1: [0],
      2: [0, 3],
      3: [2],
    };
    const result = visualizer.visualize({ graph, start: 0 });

    assert.strictEqual(result.finalState.visitedNodes.length, 4);
  });

  await t.test('should return metadata', () => {
    const visualizer = new BFSVisualizer();
    const metadata = visualizer.getMetadata();

    assert.strictEqual(metadata.name, 'Breadth-First Search');
    assert.strictEqual(metadata.timeComplexity, 'O(V + E)');
    assert.strictEqual(metadata.spaceComplexity, 'O(V)');
  });

  await t.test('should throw on invalid input', () => {
    const visualizer = new BFSVisualizer();
    assert.throws(
      () => visualizer.visualize({ graph: null, start: 0 }),
      /Invalid input/
    );
  });
});

test('VisualizerFactory', async (t) => {
  await t.test('should create TwoSum visualizer', () => {
    const visualizer = VisualizerFactory.createVisualizer('twosum');
    assert.ok(visualizer instanceof TwoSumVisualizer);
  });

  await t.test('should create MergeSort visualizer', () => {
    const visualizer = VisualizerFactory.createVisualizer('mergesort');
    assert.ok(visualizer instanceof MergeSortVisualizer);
  });

  await t.test('should create BFS visualizer', () => {
    const visualizer = VisualizerFactory.createVisualizer('bfs');
    assert.ok(visualizer instanceof BFSVisualizer);
  });

  await t.test('should throw on unknown algorithm', () => {
    assert.throws(
      () => VisualizerFactory.createVisualizer('unknown'),
      /Unknown algorithm/
    );
  });

  await t.test('should return list of supported algorithms', () => {
    const algorithms = VisualizerFactory.getSupportedAlgorithms();
    assert.ok(Array.isArray(algorithms));
    assert.strictEqual(algorithms.length, 3);
    assert.ok(algorithms.includes('TwoSum'));
    assert.ok(algorithms.includes('MergeSort'));
    assert.ok(algorithms.includes('BFS'));
  });
});
