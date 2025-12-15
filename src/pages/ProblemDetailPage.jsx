import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { api } from '../lib/api';
import AIExplanationPanel from '../components/problem/AIExplanationPanel';
import TestCaseRunner from '../components/problem/TestCaseRunner';
import { Loader2 } from 'lucide-react';

const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('testcases'); // testcases | ai

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const data = await api.problems.get(id);
        setProblem(data);
        setCode(data.boilerplate[language] || '');
      } catch (error) {
        console.error("Failed to load problem", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  useEffect(() => {
    if (problem && problem.boilerplate) {
      setCode(problem.boilerplate[language] || '');
    }
  }, [language, problem]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-500 w-8 h-8"/></div>;
  if (!problem) return <div className="p-8 text-center text-red-500">Problem not found</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">{problem.title}</h1>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' : 
            problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' : 
            'bg-red-900 text-red-300'
          }`}>
            {problem.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
           <select 
             value={language} 
             onChange={(e) => setLanguage(e.target.value)}
             className="bg-gray-800 border border-gray-700 text-white text-sm rounded px-2 py-1"
           >
             <option value="javascript">JavaScript</option>
             <option value="python">Python</option>
             <option value="cpp">C++</option>
           </select>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Description */}
        <div className="w-1/4 min-w-[300px] border-r border-gray-800 bg-gray-900/50 p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Description</h2>
          <div className="text-gray-200 text-sm leading-relaxed mb-6">
            {problem.description}
          </div>
          
          <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Examples</h3>
          <div className="space-y-4">
            {problem.testCases.slice(0, 2).map((tc, idx) => (
              <div key={idx} className="bg-gray-800 p-3 rounded-md text-sm font-mono text-gray-300">
                <div><span className="text-gray-500">Input:</span> {tc.input}</div>
                <div><span className="text-gray-500">Output:</span> {tc.output}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Panel: Editor */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
           <Editor
             height="100%"
             language={language}
             value={code}
             onChange={(val) => setCode(val)}
             theme="vs-dark"
             options={{
               minimap: { enabled: false },
               fontSize: 14,
               scrollBeyondLastLine: false,
             }}
           />
        </div>

        {/* Right Panel: Tools */}
        <div className="w-1/4 min-w-[300px] border-l border-gray-800 bg-gray-900 flex flex-col">
          <div className="flex border-b border-gray-800">
            <button 
              onClick={() => setActiveTab('testcases')}
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'testcases' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            >
              Test Cases
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'ai' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            >
              AI Helper
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden p-4">
             {activeTab === 'testcases' ? (
               <TestCaseRunner 
                 testCases={problem.testCases} 
                 code={code} 
                 language={language}
               />
             ) : (
               <AIExplanationPanel code={code} problemId={id} />
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
