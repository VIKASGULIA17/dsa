import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';
import { 
  Calendar, 
  Users, 
  Clock, 
  Trophy,
  Search,
  Filter,
  Star,
  ArrowRight,
  Play,
  Lock
} from 'lucide-react';

const ContestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // upcoming, live, past

  // Mock contest data
  const mockContests = [
    {
      id: 1,
      title: 'Weekly Contest 400',
      description: 'Test your coding skills with our weekly algorithmic challenges',
      status: 'live', // live, upcoming, past
      startTime: '2024-01-15T20:00:00Z',
      endTime: '2024-01-15T22:00:00Z',
      duration: 120, // minutes
      participants: 2847,
      maxParticipants: 5000,
      prizePool: '$500',
      difficulty: 'Medium',
      tags: ['Array', 'String', 'Dynamic Programming'],
      registrationOpen: true
    },
    {
      id: 2,
      title: 'Graph Algorithms Marathon',
      description: 'Advanced graph theory problems for experienced programmers',
      status: 'upcoming',
      startTime: '2024-01-20T18:00:00Z',
      endTime: '2024-01-20T21:00:00Z',
      duration: 180,
      participants: 1534,
      maxParticipants: 3000,
      prizePool: '$1000',
      difficulty: 'Hard',
      tags: ['Graph', 'Tree', 'Shortest Path'],
      registrationOpen: true
    },
    {
      id: 3,
      title: 'Data Structures Championship',
      description: 'Master fundamental data structures and their applications',
      status: 'past',
      startTime: '2024-01-10T14:00:00Z',
      endTime: '2024-01-10T16:00:00Z',
      duration: 120,
      participants: 4521,
      maxParticipants: null,
      prizePool: '$750',
      difficulty: 'Easy',
      tags: ['Stack', 'Queue', 'Linked List'],
      registrationOpen: false
    },
    {
      id: 4,
      title: 'Algorithm Design Challenge',
      description: 'Design efficient algorithms for complex optimization problems',
      status: 'upcoming',
      startTime: '2024-01-25T16:00:00Z',
      endTime: '2024-01-25T19:00:00Z',
      duration: 180,
      participants: 892,
      maxParticipants: 2000,
      prizePool: '$1500',
      difficulty: 'Hard',
      tags: ['Greedy', 'Dynamic Programming', 'Divide and Conquer'],
      registrationOpen: true
    }
  ];

  const { data: contestsData, isLoading, error } = useQuery({
    queryKey: ['contests', statusFilter],
    queryFn: () => api.contests.getAll({ status: statusFilter }),
    initialData: mockContests
  });

  const contests = contestsData || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntil = (dateString) => {
    const now = new Date();
    const target = new Date(dateString);
    const diff = target - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) return `${days}d ${hours}h ${minutes}m`;
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}m`;
    }
    return 'Started';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'upcoming': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'past': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const filteredContests = contests.filter(contest => {
    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || contest.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 h-64"></div>
              ))}
            </div>
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
            <h2 className="text-xl font-semibold mb-2">Error Loading Contests</h2>
            <p className="text-gray-400">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Contests</h1>
          <p className="text-gray-400 text-lg">
            Compete with others and test your coding skills in real-time challenges
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search contests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Contests</option>
              <option value="live">Live Now</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Contest Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Live Contests</p>
                <p className="text-2xl font-bold text-red-400">1</p>
              </div>
              <div className="w-12 h-12 bg-red-400/20 rounded-lg flex items-center justify-center">
                <Play className="text-red-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-blue-400">2</p>
              </div>
              <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Participants</p>
                <p className="text-2xl font-bold text-green-400">9.8K</p>
              </div>
              <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                <Users className="text-green-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Prize Pool</p>
                <p className="text-2xl font-bold text-yellow-400">$3.8K</p>
              </div>
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                <Trophy className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Contests List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContests.map((contest) => (
            <Link
              key={contest.id}
              to={`/contests/${contest.id}`}
              className="block bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors border border-gray-800 hover:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{contest.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contest.status)}`}>
                      {contest.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {contest.description}
                  </p>
                </div>
                
                <ArrowRight className="text-gray-600 ml-4 flex-shrink-0" size={20} />
              </div>
              
              {/* Contest Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar size={16} />
                    <span>{formatDate(contest.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={16} />
                    <span>{contest.duration}min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users size={16} />
                    <span>
                      {contest.participants.toLocaleString()}
                      {contest.maxParticipants && ` / ${contest.maxParticipants.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <Trophy size={16} />
                    <span>{contest.prizePool}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(contest.difficulty)}`}>
                      {contest.difficulty}
                    </span>
                    {contest.status === 'upcoming' && contest.registrationOpen && (
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">
                        Registration Open
                      </span>
                    )}
                    {contest.status === 'live' && (
                      <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-xs">
                        {getTimeUntil(contest.endTime)} left
                      </span>
                    )}
                    {contest.status === 'upcoming' && !contest.registrationOpen && (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                        Registration Closed
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-sm text-gray-400">4.8</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {contest.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredContests.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No contests found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestsPage;