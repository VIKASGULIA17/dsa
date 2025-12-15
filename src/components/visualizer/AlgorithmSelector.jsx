import React from 'react';

const AlgorithmSelector = ({ selected, onSelect }) => {
  const algorithms = [
    { id: 'bubble-sort', name: 'Bubble Sort' },
    { id: 'selection-sort', name: 'Selection Sort' },
    { id: 'insertion-sort', name: 'Insertion Sort' },
    { id: 'binary-search', name: 'Binary Search' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">Select Algorithm</label>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Choose --</option>
        {algorithms.map((algo) => (
          <option key={algo.id} value={algo.id}>
            {algo.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AlgorithmSelector;
