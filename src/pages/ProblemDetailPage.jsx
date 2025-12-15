import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';
import { 
  ArrowLeft,
  Clock, 
  Users, 
  Star, 
  CheckCircle,
  Code,
  Play,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share
} from 'lucide-react';

const ProblemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('description');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  // Mock problem data
  const mockProblem = {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3,2,4], target = 6
Output: [1,2]

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    tags: ['Hash Table', 'Array'],
    submissions: 15420,
    acceptanceRate: 45.2,
    timeLimit: '1s',
    memoryLimit: '256MB',
    solved: true,
    relatedProblems: [
      { id: 15, title: '3Sum', difficulty: 'Medium' },
      { id: 18, title: '4Sum', difficulty: 'Medium' },
      { id: 167, title: 'Two Sum II - Input array is sorted', difficulty: 'Easy' }
    ]
  };

  const { data: problem, isLoading, error } = useQuery({
    queryKey: ['problem', id],
    queryFn: () => api.problems.getById(id),
    initialData: mockProblem
  });

  const { data: submissions } = useQuery({
    queryKey: ['submissions', id],
    queryFn: () => api.problems.getSubmissions(id)
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    try {
      await api.problems.submitSolution(id, {
        code,
        language,
        testCases: [] // Mock test cases
      });
      alert('Solution submitted successfully!');
      setCode('');
    } catch (error) {
      alert('Failed to submit solution. Please try again.');
    }
  };

  const codeTemplates = {
    javascript: `function twoSum(nums, target) {
    // Write your solution here
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`,
    python: `def two_sum(nums, target):
    # Write your solution here
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return []`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        unordered_map<int, int> numMap;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }
            numMap[nums[i]] = i;
        }
        
        return {};
    }
};`
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Problem not found</h2>
            <Link to="/problems" className="text-blue-400 hover:text-blue-300">
              ← Back to problems
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/problems')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Problems
            </button>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <ThumbsUp size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <ThumbsDown size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Share size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
                {problem.solved && (
                  <CheckCircle className="text-green-400" size={24} />
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{problem.submissions.toLocaleString()} submissions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} />
                  <span>{problem.acceptanceRate}% acceptance</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{problem.timeLimit}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>{problem.memoryLimit}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2">
                <Play size={16} />
                Run
              </button>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Code size={16} />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Problem Description */}
          <div className="bg-gray-900 rounded-lg">
            {/* Tabs */}
            <div className="border-b border-gray-800">
              <div className="flex">
                {[
                  { key: 'description', label: 'Description' },
                  { key: 'submissions', label: 'Submissions' },
                  { key: 'discuss', label: 'Discuss' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={`px-6 py-4 font-medium transition-colors ${
                      selectedTab === tab.key
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {selectedTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Problem Statement</h3>
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                        {problem.description}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Examples</h3>
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-4">
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm text-gray-400">Input: </span>
                              <code className="text-green-400">{example.input}</code>
                            </div>
                            <div>
                              <span className="text-sm text-gray-400">Output: </span>
                              <code className="text-blue-400">{example.output}</code>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-sm text-gray-400">Explanation: </span>
                                <span className="text-gray-300">{example.explanation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm">{constraint}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-md text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'submissions' && (
                <div className="text-center py-8">
                  <Code className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">Your Submissions</h3>
                  <p className="text-gray-500">No submissions yet. Start coding!</p>
                </div>
              )}

              {selectedTab === 'discuss' && (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">Discussion</h3>
                  <p className="text-gray-500">No discussions yet. Be the first to start one!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-gray-900 rounded-lg">
            <div className="border-b border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setCode(codeTemplates[e.target.value] || '');
                  }}
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors">
                    Reset
                  </button>
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors">
                    Format
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Start coding your solution..."
                className="w-full h-96 bg-gray-800 border border-gray-700 rounded-lg p-4 font-mono text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                style={{ fontFamily: 'Monaco, Consolas, monospace' }}
              />
            </div>
          </div>
        </div>

        {/* Related Problems */}
        {problem.relatedProblems && problem.relatedProblems.length > 0 && (
          <div className="mt-8 bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Related Problems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {problem.relatedProblems.map((relatedProblem) => (
                <Link
                  key={relatedProblem.id}
                  to={`/problems/${relatedProblem.id}`}
                  className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
                >
                  <h4 className="font-medium text-white mb-2">{relatedProblem.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(relatedProblem.difficulty)}`}>
                    {relatedProblem.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetailPage;