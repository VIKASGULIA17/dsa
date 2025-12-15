import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';
import { 
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Settings,
  Zap,
  GitBranch,
  Search,
  TreePine,
  Network,
  Layout,
  RefreshCw
} from 'lucide-react';

const VisualizerPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('sorting');
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [currentStep, setCurrentStep] = useState(0);
  const [visualizationData, setVisualizationData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const algorithms = {
    sorting: {
      name: 'Sorting Algorithms',
      icon: Layout,
      options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort']
    },
    graph: {
      name: 'Graph Algorithms',
      icon: Network,
      options: ['Breadth-First Search', 'Depth-First Search', 'Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm']
    },
    tree: {
      name: 'Tree Algorithms',
      icon: TreePine,
      options: ['Binary Search Tree', 'AVL Tree', 'Heap', 'Trie']
    },
    searching: {
      name: 'Searching Algorithms',
      icon: Search,
      options: ['Linear Search', 'Binary Search', 'Interpolation Search', 'Exponential Search']
    },
    dynamic: {
      name: 'Dynamic Programming',
      icon: Zap,
      options: ['Fibonacci', 'Longest Common Subsequence', 'Knapsack Problem', 'Coin Change']
    }
  };

  const codeExamples = {
    'sorting': {
      'Bubble Sort': `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}`,
      'Selection Sort': `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap elements
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    return arr;
}`
    },
    'graph': {
      'Breadth-First Search': `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node);
        
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`
    },
    'tree': {
      'Binary Search Tree': `class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function insert(root, val) {
    if (!root) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insert(root.left, val);
    } else {
        root.right = insert(root.right, val);
    }
    
    return root;
}`
    },
    'searching': {
      'Binary Search': `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`
    },
    'dynamic': {
      'Fibonacci': `function fibonacci(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`
    }
  };

  // Generate random array for visualization
  const generateRandomArray = (size = 20) => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 10);
    }
    setArray(newArray);
    setCurrentStep(0);
    setVisualizationData([]);
  };

  // Initialize with random array
  useEffect(() => {
    generateRandomArray(15);
  }, []);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    generateRandomArray();
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const ArrayVisualization = () => {
    if (selectedAlgorithm !== 'sorting' && selectedAlgorithm !== 'searching') {
      return (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            {React.createElement(algorithms[selectedAlgorithm].icon, { size: 48 })}
          </div>
          <h3 className="text-lg font-semibold mb-2">Visualization not available</h3>
          <p className="text-gray-500">
            This algorithm will be visualized when you run the code.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Array Visualization</h3>
        <div className="flex items-end justify-center gap-1 h-64">
          {array.map((value, index) => (
            <div
              key={index}
              className="bg-blue-500 rounded-t transition-all duration-300 relative"
              style={{
                height: `${(value / 100) * 200}px`,
                width: '20px',
                minHeight: '20px'
              }}
            >
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const GraphVisualization = () => {
    if (selectedAlgorithm !== 'graph') {
      return null;
    }

    // Mock graph data for visualization
    const graphNodes = [
      { id: 'A', x: 100, y: 100 },
      { id: 'B', x: 200, y: 50 },
      { id: 'C', x: 200, y: 150 },
      { id: 'D', x: 300, y: 100 }
    ];

    const graphEdges = [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'D' }
    ];

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Graph Visualization</h3>
        <div className="relative h-64">
          <svg className="w-full h-full">
            {/* Edges */}
            {graphEdges.map((edge, index) => {
              const fromNode = graphNodes.find(n => n.id === edge.from);
              const toNode = graphNodes.find(n => n.id === edge.to);
              return (
                <line
                  key={index}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#6B7280"
                  strokeWidth="2"
                />
              );
            })}
            
            {/* Nodes */}
            {graphNodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill="#3B82F6"
                  stroke="#1D4ED8"
                  strokeWidth="2"
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  className="fill-white text-sm font-medium"
                >
                  {node.id}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  const TreeVisualization = () => {
    if (selectedAlgorithm !== 'tree') {
      return null;
    }

    // Mock tree structure
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Tree Visualization</h3>
        <div className="flex justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
              50
            </div>
            <div className="flex gap-8 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                  30
                </div>
                <div className="mt-4 flex gap-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    20
                  </div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    40
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                  70
                </div>
                <div className="mt-4 flex gap-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    60
                  </div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    80
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Algorithm Visualizer</h1>
          <p className="text-gray-400 text-lg">
            Interactive visualization of popular algorithms and data structures
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Algorithm Selection */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-3">Algorithm Type</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.entries(algorithms).map(([key, algo]) => {
                  const IconComponent = algo.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedAlgorithm(key)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedAlgorithm === key
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <IconComponent className="mx-auto mb-2" size={24} />
                      <div className="text-xs">{algo.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specific Algorithm */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-3">Algorithm</label>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {algorithms[selectedAlgorithm]?.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Controls */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-3">Controls</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlay}
                  className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
                <button
                  onClick={() => generateRandomArray()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>

            {/* Speed */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-3">Speed: {speed}ms</label>
              <input
                type="range"
                min="100"
                max="2000"
                value={speed}
                onChange={(e) => handleSpeedChange(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            {selectedAlgorithm === 'sorting' || selectedAlgorithm === 'searching' ? (
              <ArrayVisualization />
            ) : selectedAlgorithm === 'graph' ? (
              <GraphVisualization />
            ) : selectedAlgorithm === 'tree' ? (
              <TreeVisualization />
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <Zap className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-lg font-semibold mb-2">Step-by-step visualization</h3>
                <p className="text-gray-500">
                  Run the code to see dynamic programming solution steps
                </p>
              </div>
            )}
          </div>

          {/* Algorithm Info */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Algorithm Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Time Complexity</h4>
                <p className="text-gray-300 text-sm">
                  {selectedAlgorithm === 'sorting' ? 'O(n²) average, O(n) best case' :
                   selectedAlgorithm === 'graph' ? 'O(V + E) where V is vertices, E is edges' :
                   selectedAlgorithm === 'tree' ? 'O(log n) average, O(n) worst case' :
                   selectedAlgorithm === 'searching' ? 'O(log n) for binary search, O(n) for linear search' :
                   'O(2^n) naive, O(n) with memoization'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-green-400 mb-2">Space Complexity</h4>
                <p className="text-gray-300 text-sm">
                  {selectedAlgorithm === 'sorting' ? 'O(1) for in-place, O(n) for merge sort' :
                   selectedAlgorithm === 'graph' ? 'O(V) for visited array and queue' :
                   selectedAlgorithm === 'tree' ? 'O(h) where h is tree height' :
                   selectedAlgorithm === 'searching' ? 'O(1)' :
                   'O(n) for memoization table'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-yellow-400 mb-2">Description</h4>
                <p className="text-gray-300 text-sm">
                  {algorithms[selectedAlgorithm]?.description || 
                   'Learn and understand how this algorithm works through interactive visualization.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-gray-900 rounded-lg">
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Code Implementation</h3>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
          </div>
          
          <div className="p-4">
            <pre className="bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
              <code className="text-gray-300">
                {codeExamples[selectedAlgorithm]?.[algorithms[selectedAlgorithm]?.options[0]] || 
                 '// Code implementation will be displayed here'}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerPage;
