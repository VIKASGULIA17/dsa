import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import ContestTimer from '../components/contest/ContestTimer';
import ContestLeaderboard from '../components/contest/ContestLeaderboard';
import TestCaseRunner from '../components/problem/TestCaseRunner';
import Editor from '@monaco-editor/react';
import { Loader2, ChevronRight, CheckCircle, Circle } from 'lucide-react';

const ContestDetailPage = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [activeProblemId, setActiveProblemId] = useState(null);
  const [activeProblem, setActiveProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const fetchContest = async () => {
      setLoading(true);
      try {
        const data = await api.contests.get(id);
        setContest(data);
        setRegistered(data.registered);
        if (data.problems && data.problems.length > 0) {
           // Don't select problem automatically, let user choose
        }
      } catch (error) {
        console.error("Failed to load contest", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContest();
  }, [id]);

  useEffect(() => {
    if (activeProblemId) {
      const fetchProblem = async () => {
         try {
           const p = await api.problems.get(activeProblemId);
           setActiveProblem(p);
           setCode(p.boilerplate[language] || '');
         } catch (e) {
           console.error(e);
         }
      };
      fetchProblem();
    } else {
        setActiveProblem(null);
    }
  }, [activeProblemId, language]);

  const handleRegister = async () => {
    await api.contests.register(id);
    setRegistered(true);
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-500 w-8 h-8"/></div>;
  if (!contest) return <div className="p-8 text-center text-red-500">Contest not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-7xl h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{contest.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
             <span>Status: <span className="text-blue-400 uppercase font-semibold">{contest.status}</span></span>
             <span>•</span>
             <span>{registered ? 'Registered' : 'Not Registered'}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <ContestTimer startTime={contest.startTime} endTime={contest.endTime} />
          {!registered && contest.status === 'upcoming' && (
            <button 
              onClick={handleRegister}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-900/20"
            >
              Register Now
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left Sidebar: Problems & Leaderboard */}
        <div className="w-1/3 min-w-[300px] flex flex-col gap-6 overflow-y-auto pr-2">
           {/* Problem List */}
           <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
             <div className="p-3 bg-gray-800/50 border-b border-gray-800 font-semibold text-white">
               Problems
             </div>
             <div className="divide-y divide-gray-800">
               {contest.problems.map((p) => (
                 <button
                   key={p.id}
                   onClick={() => setActiveProblemId(p.id)}
                   disabled={!registered && contest.status !== 'ended'}
                   className={`w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors text-left ${activeProblemId === p.id ? 'bg-blue-900/10 border-l-4 border-blue-500' : ''}`}
                 >
                   <div>
                     <div className="font-medium text-white">{p.title}</div>
                     <div className="text-xs text-gray-400">{p.points} points</div>
                   </div>
                   <ChevronRight className={`w-4 h-4 ${activeProblemId === p.id ? 'text-blue-500' : 'text-gray-600'}`} />
                 </button>
               ))}
               {(!registered && contest.status !== 'ended') && (
                 <div className="p-4 text-center text-sm text-gray-500">
                   Register to access problems
                 </div>
               )}
             </div>
           </div>

           <ContestLeaderboard contestId={id} />
        </div>

        {/* Main Content: Problem Solver or Welcome */}
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden flex flex-col">
          {activeProblem ? (
            <div className="flex flex-col h-full">
              <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
                <h2 className="font-bold text-white">{activeProblem.title}</h2>
                 <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-white text-xs rounded px-2 py-1"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                  </select>
              </div>
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  <div className="flex-1 flex flex-col">
                      <Editor
                         height="100%"
                         language={language}
                         value={code}
                         onChange={(val) => setCode(val)}
                         theme="vs-dark"
                         options={{ minimap: { enabled: false }, fontSize: 14 }}
                       />
                  </div>
                  <div className="w-1/3 min-w-[300px] border-l border-gray-800 overflow-hidden">
                      <TestCaseRunner 
                        testCases={activeProblem.testCases} 
                        code={code} 
                        language={language}
                      />
                  </div>
              </div>
            </div>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
               <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                 <Circle className="w-8 h-8 text-gray-600" />
               </div>
               <p className="text-lg">Select a problem to start solving</p>
             </div>
          )}
        </div>

export default ContestDetailPage;
