import { VisualizationStep, VisualizationResult } from '../models/VisualizationStep.js';

/**
 * Abstract base class defining the AlgorithmVisualizer strategy interface
 */
export class AlgorithmVisualizer {
  /**
   * Visualize the algorithm with given input
   * @param {any} input - The input data for the algorithm
   * @returns {VisualizationResult} - Ordered list of VisualizationStep objects
   */
  visualize(input) {
    throw new Error('visualize() must be implemented by subclass');
  }

  /**
   * Get algorithm metadata
   * @returns {Object} - Algorithm information
   */
  getMetadata() {
    throw new Error('getMetadata() must be implemented by subclass');
  }
}

/**
 * TwoSum Algorithm Visualizer
 * Finds two numbers that add up to a target value
 */
export class TwoSumVisualizer extends AlgorithmVisualizer {
  visualize(input) {
    const { nums, target } = input;
    const steps = [];
    let stepNumber = 0;

    if (!Array.isArray(nums) || typeof target !== 'number') {
      throw new Error('Invalid input: expected {nums: number[], target: number}');
    }

    const data = [...nums];
    steps.push(
      new VisualizationStep(
        ++stepNumber,
        'initialize',
        { array: data, target },
        `Initializing with array [${data.join(', ')}] and target ${target}`,
        { indices: [] }
      )
    );

    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      steps.push(
        new VisualizationStep(
          ++stepNumber,
          'check',
          { array: data, current: nums[i], complement, target },
          `At index ${i}: checking if ${complement} exists in seen values`,
          { indices: [i] }
        )
      );

      if (seen.has(complement)) {
        const foundIndex = seen.get(complement);
        steps.push(
          new VisualizationStep(
            ++stepNumber,
            'found',
            { array: data, found: true, pairs: [foundIndex, i] },
            `Found pair: nums[${foundIndex}] + nums[${i}] = ${nums[foundIndex]} + ${nums[i]} = ${target}`,
            { indices: [foundIndex, i] }
          )
        );

        const result = new VisualizationResult(
          'Two Sum',
          steps,
          { pairs: [foundIndex, i], values: [nums[foundIndex], nums[i]] },
          `Solution found at indices [${foundIndex}, ${i}]`
        );
        return result;
      }

      seen.set(nums[i], i);
      steps.push(
        new VisualizationStep(
          ++stepNumber,
          'store',
          { array: data, stored: nums[i], index: i },
          `Storing ${nums[i]} at index ${i} in seen map`,
          { indices: [i] }
        )
      );
    }

    steps.push(
      new VisualizationStep(
        ++stepNumber,
        'complete',
        { array: data, found: false },
        'No pair found that sums to the target',
        { indices: [] }
      )
    );

    return new VisualizationResult(
      'Two Sum',
      steps,
      { pairs: null },
      'No solution found'
    );
  }

  getMetadata() {
    return {
      name: 'Two Sum',
      description: 'Find two numbers that add up to a target',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      inputFormat: { nums: 'number[]', target: 'number' },
      example: { nums: [2, 7, 11, 15], target: 9 },
    };
  }
}

/**
 * Merge Sort Algorithm Visualizer
 * Demonstrates the merge sort algorithm with step-by-step visualization
 */
export class MergeSortVisualizer extends AlgorithmVisualizer {
  visualize(input) {
    const { array } = input;
    const steps = [];
    let stepNumber = 0;

    if (!Array.isArray(array)) {
      throw new Error('Invalid input: expected {array: number[]}');
    }

    const data = [...array];
    steps.push(
      new VisualizationStep(
        ++stepNumber,
        'initialize',
        { array: data },
        `Starting Merge Sort on array [${data.join(', ')}]`,
        { indices: [] }
      )
    );

    const mergeSort = (arr, left, right, depth = 0) => {
      if (left >= right) return;

      const mid = Math.floor((left + right) / 2);

      // Split phase
      steps.push(
        new VisualizationStep(
          ++stepNumber,
          'split',
          { array: [...data], range: [left, right] },
          `Dividing array[${left}..${right}] into two halves`,
          { indices: Array.from({ length: right - left + 1 }, (_, i) => left + i) }
        )
      );

      mergeSort(arr, left, mid, depth + 1);
      mergeSort(arr, mid + 1, right, depth + 1);

      // Merge phase
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0;
      let j = 0;
      let k = left;

      steps.push(
        new VisualizationStep(
          ++stepNumber,
          'merge_start',
          { array: [...data], left: leftArr, right: rightArr, mergeRange: [left, right] },
          `Merging sorted subarrays: [${leftArr.join(', ')}] and [${rightArr.join(', ')}]`,
          { indices: Array.from({ length: right - left + 1 }, (_, i) => left + i) }
        )
      );

      while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          steps.push(
            new VisualizationStep(
              ++stepNumber,
              'compare_and_copy',
              { array: [...arr], compared: [leftArr[i], rightArr[j]], copied: leftArr[i] },
              `Comparing ${leftArr[i]} and ${rightArr[j]}: ${leftArr[i]} is smaller, placing at position ${k}`,
              { indices: [k] }
            )
          );
          i++;
        } else {
          arr[k] = rightArr[j];
          steps.push(
            new VisualizationStep(
              ++stepNumber,
              'compare_and_copy',
              { array: [...arr], compared: [leftArr[i], rightArr[j]], copied: rightArr[j] },
              `Comparing ${leftArr[i]} and ${rightArr[j]}: ${rightArr[j]} is smaller, placing at position ${k}`,
              { indices: [k] }
            )
          );
          j++;
        }
        k++;
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        steps.push(
          new VisualizationStep(
            ++stepNumber,
            'copy_remaining',
            { array: [...arr], copied: leftArr[i] },
            `Copying remaining element ${leftArr[i]} from left array`,
            { indices: [k] }
          )
        );
        i++;
        k++;
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        steps.push(
          new VisualizationStep(
            ++stepNumber,
            'copy_remaining',
            { array: [...arr], copied: rightArr[j] },
            `Copying remaining element ${rightArr[j]} from right array`,
            { indices: [k] }
          )
        );
        j++;
        k++;
      }
    };

    mergeSort(data, 0, data.length - 1);

    steps.push(
      new VisualizationStep(
        ++stepNumber,
        'complete',
        { array: data },
        `Merge Sort complete. Final sorted array: [${data.join(', ')}]`,
        { indices: [] }
      )
    );

    return new VisualizationResult(
      'Merge Sort',
      steps,
      { array: data, sorted: true },
      `Array sorted in ${steps.length} steps`
    );
  }

  getMetadata() {
    return {
      name: 'Merge Sort',
      description: 'Divide-and-conquer sorting algorithm',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      inputFormat: { array: 'number[]' },
      example: { array: [64, 34, 25, 12, 22, 11, 90] },
    };
  }
}

/**
 * Breadth-First Search (BFS) Algorithm Visualizer
 */
export class BFSVisualizer extends AlgorithmVisualizer {
  visualize(input) {
    const { graph, start } = input;
    const steps = [];
    let stepNumber = 0;

    if (!graph || typeof start !== 'number') {
      throw new Error('Invalid input: expected {graph: object, start: number}');
    }

    const visited = new Set();
    const queue = [];
    const traversalOrder = [];

    steps.push(
      new VisualizationStep(
        ++stepNumber,
        'initialize',
        { graph, start, queue: [], visited: [], traversalOrder: [] },
        `Starting BFS from node ${start}`,
        { nodes: [start] }
      )
    );

    queue.push(start);
    visited.add(start);

    steps.push(
      new VisualizationStep(
        ++stepNumber,
        'enqueue',
        { graph, queue: [...queue], visited: Array.from(visited), traversalOrder },
        `Enqueuing start node ${start}`,
        { nodes: [start] }
      )
    );

    while (queue.length > 0) {
      const node = queue.shift();
      traversalOrder.push(node);

      steps.push(
        new VisualizationStep(
          ++stepNumber,
          'dequeue_and_visit',
          { graph, queue: [...queue], visited: Array.from(visited), traversalOrder: [...traversalOrder], currentNode: node },
          `Dequeuing and visiting node ${node}`,
          { nodes: [node] }
        )
      );

      const neighbors = graph[node] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);

          steps.push(
            new VisualizationStep(
              ++stepNumber,
              'discover_and_enqueue',
              { graph, queue: [...queue], visited: Array.from(visited), traversalOrder, discoveredNode: neighbor, from: node },
              `Discovered unvisited neighbor ${neighbor} from node ${node}, enqueuing it`,
              { nodes: [node, neighbor], edges: [[node, neighbor]] }
            )
          );
        }
      }
    }

    steps.push(
      new VisualizationStep(
        ++stepNumber,
        'complete',
        { graph, traversalOrder, visited: Array.from(visited) },
        `BFS traversal complete. Visited nodes in order: [${traversalOrder.join(', ')}]`,
        { nodes: traversalOrder }
      )
    );

    return new VisualizationResult(
      'BFS',
      steps,
      { traversalOrder, visitedNodes: Array.from(visited) },
      `Traversed ${visited.size} nodes`
    );
  }

  getMetadata() {
    return {
      name: 'Breadth-First Search',
      description: 'Graph traversal algorithm using a queue',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      inputFormat: { graph: 'object (adjacency list)', start: 'number' },
      example: {
        graph: { 0: [1, 2], 1: [0, 2], 2: [0, 1, 3], 3: [2] },
        start: 0,
      },
    };
  }
}

/**
 * Factory for creating visualizers
 */
export class VisualizerFactory {
  static createVisualizer(algorithmType) {
    switch (algorithmType.toLowerCase()) {
      case 'twosum':
        return new TwoSumVisualizer();
      case 'mergesort':
        return new MergeSortVisualizer();
      case 'bfs':
        return new BFSVisualizer();
      default:
        throw new Error(`Unknown algorithm type: ${algorithmType}`);
    }
  }

  static getSupportedAlgorithms() {
    return ['TwoSum', 'MergeSort', 'BFS'];
  }
}
