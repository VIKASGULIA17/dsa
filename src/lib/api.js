// Mock API client

export const api = {
  visualizer: {
    run: async (algorithm, input) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock response based on algorithm
          const steps = [];
          if (algorithm === 'bubble-sort') {
            const arr = [...input];
            steps.push({ array: [...arr], activeIndices: [], swapped: false, description: 'Initial State' });
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < arr.length - i - 1; j++) {
                steps.push({ array: [...arr], activeIndices: [j, j + 1], swapped: false, description: `Comparing ${arr[j]} and ${arr[j+1]}` });
                if (arr[j] > arr[j + 1]) {
                  let temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                  steps.push({ array: [...arr], activeIndices: [j, j + 1], swapped: true, description: `Swapped ${arr[j]} and ${arr[j+1]}` });
                }
              }
            }
            steps.push({ array: [...arr], activeIndices: [], swapped: false, description: 'Sorted' });
          } else {
             // Default mock for other algorithms
             steps.push({ state: 'Start', description: 'Algorithm started' });
             steps.push({ state: 'End', description: 'Algorithm finished' });
          }
          resolve({ steps });
        }, 500);
      });
    }
  },
  ai: {
    explain: async (code, problemId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            explanation: `Here is an explanation for your code on problem ${problemId || 'unknown'}.\n\nThe code uses a standard approach. \n1. First, it initializes variables.\n2. Then it iterates through the data.\n3. Finally, it returns the result.`,
            complexity: {
              time: "O(n)",
              space: "O(1)"
            }
          });
        }, 800);
      });
    }
  },
  execute: async (code, language, testCases) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = testCases.map((tc, index) => {
           // Randomly pass or fail for demo purposes if not simple
           const passed = Math.random() > 0.2; 
           return {
             id: index,
             input: tc.input,
             expectedOutput: tc.output,
             actualOutput: passed ? tc.output : "Wrong Answer",
             passed: passed,
             status: passed ? "Accepted" : "Wrong Answer"
           };
        });
        resolve({ results });
      }, 1000);
    });
  },
  contests: {
    get: async (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
           resolve({
             id: id,
             title: `Contest ${id}`,
             startTime: new Date(Date.now() + 3600 * 1000).toISOString(), // Starts in 1 hour
             endTime: new Date(Date.now() + 7200 * 1000).toISOString(),
             status: "upcoming",
             registered: false,
             problems: [
               { id: "p1", title: "Problem 1", points: 100 },
               { id: "p2", title: "Problem 2", points: 200 },
               { id: "p3", title: "Problem 3", points: 300 },
             ]
           });
        }, 300);
      });
    },
    getLeaderboard: async (id) => {
       return new Promise((resolve) => {
        setTimeout(() => {
           resolve([
             { rank: 1, user: "Alice", score: 300, time: "00:45:00" },
             { rank: 2, user: "Bob", score: 250, time: "00:50:00" },
             { rank: 3, user: "Charlie", score: 200, time: "01:00:00" },
             { rank: 4, user: "David", score: 100, time: "00:20:00" },
             { rank: 5, user: "Eve", score: 50, time: "00:10:00" },
           ]);
        }, 400);
      });
    },
    register: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: "Registered successfully" });
            }, 500);
        })
    }
  },
  problems: {
      get: async (id) => {
          return new Promise((resolve) => {
              setTimeout(() => {
                  resolve({
                      id: id,
                      title: "Two Sum",
                      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                      difficulty: "Easy",
                      boilerplate: {
                          javascript: "function twoSum(nums, target) {\n  \n}",
                          python: "def twoSum(nums: List[int], target: int) -> List[int]:\n    pass",
                          cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};"
                      },
                      testCases: [
                          { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
                          { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
                          { input: "nums = [3,3], target = 6", output: "[0,1]" }
                      ]
                  })
              }, 400);
          })
      }
  }
};
