import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';
import { 
  ArrowLeft,
  Calendar, 
  Users, 
  Clock, 
  Trophy,
  Play,
  Lock,
  Star,
  Code,
  Medal,
  Target,
  Timer,
  CheckCircle
} from 'lucide-react';

const ContestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // overview, problems, leaderboard

  // Mock contest detail data
  const mockContestDetail = {
    id: 1,
    title: 'Weekly Contest 400',
    description: 'Test your coding skills with our weekly algorithmic challenges designed to help you improve your problem-solving abilities.',
    status: 'live', // live, upcoming, past
    startTime: '2024-01-15T20:00:00Z',
    endTime: '2024-01-15T22:00:00Z',
    registrationDeadline: '2024-01-15T19:30:00Z',
    duration: 120, // minutes
    participants: 2847,
    maxParticipants: 5000,
    prizePool: '$500',
    difficulty: 'Medium',
    tags: ['Array', 'String', 'Dynamic Programming'],
    registrationOpen: true,
    rules: [
      'You must register before the registration deadline',
      'Contest duration is 2 hours',
      'You can submit solutions anytime during the contest',
      'Only the last submission will be counted',
      'Internet research is not allowed',
      'Solutions must be original work'
    ],
    prizes: [
      { rank: 1, prize: '$200', color: 'text-yellow-400' },
      { rank: 2, prize: '$150', color: 'text-gray-300' },
      { rank: 3, prize: '$100', color: 'text-yellow-600' },
      { rank: '4-10', prize: '$25', color: 'text-blue-400' },
      { rank: 'Top 20%', prize: 'Certificate', color: 'text-green-400' }
    ],
    problems: [
      {
        id: 101,
        title: 'Array Sum Queries',
        difficulty: 'Easy',
        points: 100,
        solved: false,
        submissions: 1834,
        acceptanceRate: 67.3
      },
      {
        id: 102,
        title: 'String Pattern Matching',
        difficulty: 'Medium',
        points: 200,
        solved: false,
        submissions: 1247,
        acceptanceRate: 45.2
      },
      {
        id: 103,
        title: 'Dynamic Programming Challenge',
        difficulty: 'Medium',
        points: 300,
        solved: false,
        submissions: 892,
        acceptanceRate: 32.1
      },
      {
        id: 104,
        title: 'Advanced Graph Algorithms',
        difficulty: 'Hard',
        points: 500,
        solved: false,
        submissions: 234,
        acceptanceRate: 18.7
      }
    ],
    leaderboard: [
      {
        rank: 1,
        username: 'codemaster',
        score: 1100,
        problemsSolved: 4,
        totalTime: 75, // minutes
        penalty: 2 // wrong submissions
      },
      {
        rank: 2,
        username: 'algorithm_guru',
        score: 1100,
        problemsSolved: 4,
        totalTime: 89,
        penalty: 1
      },
      {
        rank: 3,
        username: 'python_pro',
        score: 1000,
        problemsSolved: 3,
        totalTime: 65,
        penalty: 3
      }
    ],
    timeRemaining: 45 // minutes left in contest
  };

  const { data: contest, isLoading, error } = useQuery({
    queryKey: ['contest', id],
    queryFn: () => api.contests.getById(id),
    initialData: mockContestDetail
  });

  const { data: leaderboard } = useQuery({
    queryKey: ['contest-leaderboard', id],
    queryFn: () => api.contests.getLeaderboard(id),
    initialData: mockContestDetail.leaderboard
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'upcoming': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'past': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const handleRegister = async () => {
    try {
      // Mock registration
      alert('Successfully registered for the contest!');
    } catch (error) {
      alert('Failed to register. Please try again.');
    }
  };

  const handleJoinContest = () => {
    navigate(`/contests/${id}/problems`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Contest not found</h2>
            <Link to="/contests" className="text-blue-400 hover:text-blue-300">
              ← Back to contests
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
        <div className="max-w-6xl mx-auto p-6">
          <button
            onClick={() => navigate('/contests')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Contests
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-white">{contest.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(contest.status)}`}>
                  {contest.status.toUpperCase()}
                </span>
              </div>
              
              <p className="text-gray-400 mb-4 max-w-2xl">{contest.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(contest.startTime)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{contest.duration} minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{contest.participants.toLocaleString()} participants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy size={16} />
                  <span>{contest.prizePool}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              {contest.status === 'upcoming' && contest.registrationOpen && (
                <button 
                  onClick={handleRegister}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Register
                </button>
              )}
              {contest.status === 'live' && (
                <button 
                  onClick={handleJoinContest}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Play size={16} />
                  Join Contest ({contest.timeRemaining}m left)
                </button>
              )}
              {(contest.status === 'past' || !contest.registrationOpen) && (
                <button 
                  disabled
                  className="px-6 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  {contest.status === 'past' ? 'Contest Ended' : 'Registration Closed'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-gray-800">
          <div className="flex">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'problems', label: 'Problems' },
              { key: 'leaderboard', label: 'Leaderboard' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contest Rules */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Contest Rules</h3>
                <ul className="space-y-2">
                  {contest.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prizes */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Prizes</h3>
                <div className="space-y-3">
                  {contest.prizes.map((prize, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          prize.rank === 1 ? 'bg-yellow-400/20' :
                          prize.rank === 2 ? 'bg-gray-300/20' :
                          prize.rank === 3 ? 'bg-yellow-600/20' :
                          'bg-blue-400/20'
                        }`}>
                          <Medal className={`w-4 h-4 ${prize.rank === 1 ? 'text-yellow-400' :
                          prize.rank === 2 ? 'text-gray-300' :
                          prize.rank === 3 ? 'text-yellow-600' :
                          'text-blue-400'}`} />
                        </div>
                        <span className="font-medium">Rank {prize.rank}</span>
                      </div>
                      <span className={`font-semibold ${prize.color}`}>{prize.prize}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contest Status */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Status</h3>
                <div className="space-y-4">
                  {contest.status === 'upcoming' && (
                    <>
                      <div className="flex items-center gap-2 text-blue-400">
                        <Timer size={16} />
                        <span>Starts in: 2d 14h 30m</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle size={16} />
                        <span>Registration open</span>
                      </div>
                    </>
                  )}
                  {contest.status === 'live' && (
                    <>
                      <div className="flex items-center gap-2 text-red-400">
                        <Play size={16} />
                        <span>Live now!</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock size={16} />
                        <span>{contest.timeRemaining} minutes remaining</span>
                      </div>
                    </>
                  )}
                  {contest.status === 'past' && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <CheckCircle size={16} />
                      <span>Contest ended</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contest Info */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Contest Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span>{contest.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Problems:</span>
                    <span>{contest.problems?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Difficulty:</span>
                    <span className={getDifficultyColor(contest.difficulty)}>{contest.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Participants:</span>
                    <span>{contest.maxParticipants?.toLocaleString() || 'Unlimited'}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {contest.tags.map((tag, index) => (
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
          </div>
        )}

        {activeTab === 'problems' && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6">Problems ({contest.problems?.length || 0})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contest.problems?.map((problem) => (
                <div
                  key={problem.id}
                  className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-white">{problem.title}</h4>
                    <span className="text-sm font-medium text-yellow-400">{problem.points} pts</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    {problem.solved && (
                      <CheckCircle className="text-green-400" size={16} />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{problem.submissions} submissions</span>
                    <span>{problem.acceptanceRate}% solved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6">Leaderboard</h3>
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index < 3 ? 'bg-gray-800' : 'bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      entry.rank === 1 ? 'bg-yellow-400/20 text-yellow-400' :
                      entry.rank === 2 ? 'bg-gray-300/20 text-gray-300' :
                      entry.rank === 3 ? 'bg-yellow-600/20 text-yellow-600' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {entry.rank}
                    </div>
                    <span className="font-medium">{entry.username}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-yellow-400">{entry.score}</div>
                      <div className="text-gray-400 text-xs">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-400">{entry.problemsSolved}</div>
                      <div className="text-gray-400 text-xs">Solved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-400">{entry.totalTime}m</div>
                      <div className="text-gray-400 text-xs">Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-red-400">{entry.penalty}</div>
                      <div className="text-gray-400 text-xs">Penalty</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDetailPage;