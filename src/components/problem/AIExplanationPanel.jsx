import React, { useState } from 'react';
import { api } from '../../lib/api';
import { Bot, Loader2 } from 'lucide-react';

const AIExplanationPanel = ({ code, problemId }) => {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    try {
      const data = await api.ai.explain(code, problemId);
      setExplanation(data);
    } catch (error) {
      console.error("Failed to get explanation", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
          <Bot className="w-5 h-5 text-purple-400" />
          AI Assistant
        </h3>
        <button
          onClick={handleExplain}
          disabled={loading || !code}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:opacity-50 text-white text-sm rounded-md transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Explain Code'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-[200px]">
        {explanation ? (
          <div className="space-y-4">
             <div className="bg-gray-800/50 p-3 rounded-md">
               <h4 className="text-sm font-medium text-gray-300 mb-1">Time & Space Complexity</h4>
               <div className="grid grid-cols-2 gap-2 text-sm">
                 <div>Time: <span className="text-green-400 font-mono">{explanation.complexity.time}</span></div>
                 <div>Space: <span className="text-green-400 font-mono">{explanation.complexity.space}</span></div>
               </div>
             </div>
             <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
               {explanation.explanation}
             </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm p-4 text-center">
            <Bot className="w-12 h-12 mb-2 opacity-20" />
            <p>Ask AI to explain your code logic and complexity analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIExplanationPanel;
