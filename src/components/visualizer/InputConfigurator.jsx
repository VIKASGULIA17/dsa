import React, { useState, useEffect } from 'react';

const InputConfigurator = ({ initialInput, onInputChange }) => {
  const [inputValue, setInputValue] = useState(initialInput.join(', '));

  useEffect(() => {
    setInputValue(initialInput.join(', '));
  }, [initialInput]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    const parsed = e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    onInputChange(parsed);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">Input Data (comma separated)</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-2 text-xs text-gray-500">
        Example: 5, 2, 9, 1, 5, 6
      </div>
    </div>
  );
};

export default InputConfigurator;
