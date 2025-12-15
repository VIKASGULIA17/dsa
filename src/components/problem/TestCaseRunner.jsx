import React, { useState } from 'react';
import { Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';

const TestCaseRunner = ({ testCases, code, language, onResults }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleRun = async () => {
    setLoading(true);
    setResults(null);
    try {
      const response = await api.execute(code, language, testCases);
      setResults(response.results);
      if (onResults) onResults(response.results);
    } catch (error) {
      console.error("Execution failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden flex flex-col h-full">
      <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-gray-900">
        <h3 className="font-semibold text-white">Test Cases</h3>
        <button
          onClick={handleRun}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-50 text-white text-sm rounded-md transition-colors"
        >
          {loading ? 'Running...' : <><Play className="w-4 h-4" /> Run Code</>}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {results ? (
          results.map((res, idx) => (
            <div key={idx} className={`p-3 rounded-md border ${res.passed ? 'border-green-900/50 bg-green-900/10' : 'border-red-900/50 bg-red-900/10'}`}>
              <div className="flex items-center gap-2 mb-2">
                {res.passed ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${res.passed ? 'text-green-400' : 'text-red-400'}`}>
                  Test Case {idx + 1}
                </span>
              </div>
              <div className="space-y-1 text-xs font-mono text-gray-300">
                <div>Input: {res.input}</div>
                <div>Expected: {res.expectedOutput}</div>
                <div className={res.passed ? 'text-gray-300' : 'text-red-300'}>
                  Output: {res.actualOutput}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-4">
             {testCases.map((tc, idx) => (
               <div key={idx} className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                 <div className="text-xs text-gray-400 mb-1">Test Case {idx + 1}</div>
                 <div className="font-mono text-sm text-gray-300">Input: {tc.input}</div>
                 <div className="font-mono text-sm text-gray-300">Target: {tc.output}</div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCaseRunner;
