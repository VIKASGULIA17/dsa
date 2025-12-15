/**
 * Utility to setup default test cases for common DSA problems
 * This can be used to initialize the execution service with pre-built test cases
 */

export const defaultTestCases = {
  'two-sum': [
    {
      id: 'test-1',
      input: { nums: [2, 7, 11, 15], target: 9 },
      expectedOutput: '0,1',
      description: 'Basic two sum test',
    },
    {
      id: 'test-2',
      input: { nums: [3, 2, 4], target: 6 },
      expectedOutput: '1,2',
      description: 'Two sum with different order',
    },
    {
      id: 'test-3',
      input: { nums: [3, 3], target: 6 },
      expectedOutput: '0,1',
      description: 'Two sum with duplicate values',
    },
  ],
  'merge-sorted-arrays': [
    {
      id: 'test-1',
      input: { arr1: [1, 3, 5], arr2: [2, 4, 6] },
      expectedOutput: '1,2,3,4,5,6',
      description: 'Merge two sorted arrays',
    },
    {
      id: 'test-2',
      input: { arr1: [], arr2: [1, 2, 3] },
      expectedOutput: '1,2,3',
      description: 'Merge with empty first array',
    },
    {
      id: 'test-3',
      input: { arr1: [1, 2, 3], arr2: [] },
      expectedOutput: '1,2,3',
      description: 'Merge with empty second array',
    },
  ],
  'fibonacci': [
    {
      id: 'test-1',
      input: { n: 0 },
      expectedOutput: '0',
      description: 'Fibonacci of 0',
    },
    {
      id: 'test-2',
      input: { n: 1 },
      expectedOutput: '1',
      description: 'Fibonacci of 1',
    },
    {
      id: 'test-3',
      input: { n: 5 },
      expectedOutput: '5',
      description: 'Fibonacci of 5',
    },
    {
      id: 'test-4',
      input: { n: 10 },
      expectedOutput: '55',
      description: 'Fibonacci of 10',
    },
  ],
  'reverse-string': [
    {
      id: 'test-1',
      input: { str: 'hello' },
      expectedOutput: 'olleh',
      description: 'Reverse simple string',
    },
    {
      id: 'test-2',
      input: { str: 'a' },
      expectedOutput: 'a',
      description: 'Reverse single character',
    },
    {
      id: 'test-3',
      input: { str: '123' },
      expectedOutput: '321',
      description: 'Reverse numeric string',
    },
  ],
  'is-palindrome': [
    {
      id: 'test-1',
      input: { str: 'racecar' },
      expectedOutput: 'true',
      description: 'Palindrome check - positive',
    },
    {
      id: 'test-2',
      input: { str: 'hello' },
      expectedOutput: 'false',
      description: 'Palindrome check - negative',
    },
    {
      id: 'test-3',
      input: { str: 'a' },
      expectedOutput: 'true',
      description: 'Single character palindrome',
    },
  ],
  'remove-duplicates': [
    {
      id: 'test-1',
      input: { arr: [1, 1, 2, 2, 2, 3] },
      expectedOutput: '3',
      description: 'Remove duplicates - basic',
    },
    {
      id: 'test-2',
      input: { arr: [1] },
      expectedOutput: '1',
      description: 'Remove duplicates - single element',
    },
    {
      id: 'test-3',
      input: { arr: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] },
      expectedOutput: '5',
      description: 'Remove duplicates - complex',
    },
  ],
};

/**
 * Get test cases for a problem
 */
export function getTestCasesForProblem(problemId) {
  return defaultTestCases[problemId] || null;
}

/**
 * Get all available problem IDs
 */
export function getAvailableProblemIds() {
  return Object.keys(defaultTestCases);
}

/**
 * Check if test cases exist for a problem
 */
export function hasTestCasesForProblem(problemId) {
  return problemId in defaultTestCases;
}
