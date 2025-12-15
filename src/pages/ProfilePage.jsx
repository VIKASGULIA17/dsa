import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';
import { 
  User,
  Settings,
  Trophy,
  Code,
  Calendar,
  Mail,
  MapPin,
  Link as LinkIcon,
  Github,
  Twitter,
  Linkedin,
  Edit,
  Save,
  X,
  Star,
  Clock,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  Activity
} from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Mock user profile data
  const mockUserProfile = {
    id: 1,
    username: 'code_master',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate developer who loves solving algorithmic problems and building innovative solutions.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    joinDate: '2023-01-15',
    avatar: null,
    stats: {
      problemsSolved: 127,
      contestsParticipated: 23,
      contestsWon: 3,
      totalSubmissions: 342,
      acceptanceRate: 68.5,
      currentStreak: 15,
      longestStreak: 45,
      ranking: 156,
      reputation: 2840
    },
    achievements: [
      { id: 1, title: 'First Problem', description: 'Solved your first problem', icon: Target, earned: true },
      { id: 2, title: 'Weekly Warrior', description: 'Participated in 5 weekly contests', icon: Trophy, earned: true },
      { id: 3, title: 'Streak Master', description: 'Maintained a 30-day solving streak', icon: Clock, earned: true },
      { id: 4, title: 'Speed Demon', description: 'Solved a problem in under 5 minutes', icon: TrendingUp, earned: false },
      { id: 5, title: 'Contest Champion', description: 'Won your first contest', icon: Award, earned: true }
    ],
    recentActivity: [
      { id: 1, type: 'problem_solved', description: 'Solved "Two Sum"', difficulty: 'Easy', time: '2 hours ago' },
      { id: 2, type: 'contest_participated', description: 'Weekly Contest 400', rank: 23, time: '1 day ago' },
      { id: 3, type: 'problem_solved', description: 'Add Two Numbers', difficulty: 'Medium', time: '2 days ago' },
      { id: 4, type: 'achievement_earned', description: 'Streak Master', time: '3 days ago' }
    ]
  };

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => api.auth.getProfile(),
    initialData: mockUserProfile
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditData({});
    } else {
      setIsEditing(true);
      setEditData({
        fullName: profile.fullName,
        bio: profile.bio,
        location: profile.location,
        website: profile.website,
        github: profile.github,
        twitter: profile.twitter,
        linkedin: profile.linkedin
      });
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile(editData);
      if (result.success) {
        setIsEditing(false);
        setEditData({});
        // Refresh profile data would happen here
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'problem_solved': return Target;
      case 'contest_participated': return Trophy;
      case 'achievement_earned': return Award;
      default: return Activity;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'problem_solved': return 'text-green-400';
      case 'contest_participated': return 'text-blue-400';
      case 'achievement_earned': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-800 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="h-96 bg-gray-800 rounded-lg"></div>
              <div className="lg:col-span-2 h-96 bg-gray-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto text-center">
          <User className="mx-auto h-16 w-16 text-gray-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Please sign in to view your profile</h2>
          <p className="text-gray-400">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {profile.fullName?.charAt(0) || profile.username?.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{profile.fullName}</h1>
                  <p className="text-xl text-gray-400 mb-2">@{profile.username}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Mail size={16} />
                      <span>{profile.email}</span>
                    </div>
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Save size={16} />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                {isEditing ? (
                  <textarea
                    value={editData.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">
                    {profile.bio || 'No bio added yet.'}
                  </p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Github size={16} className="text-gray-400" />
                      <input
                        type="url"
                        value={editData.github || ''}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="GitHub URL"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Twitter size={16} className="text-gray-400" />
                      <input
                        type="url"
                        value={editData.twitter || ''}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Twitter URL"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {profile.website && (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <LinkIcon size={16} />
                        <span className="text-sm">Website</span>
                      </a>
                    )}
                    {profile.github && (
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Github size={16} />
                        <span className="text-sm">GitHub</span>
                      </a>
                    )}
                    {profile.twitter && (
                      <a
                        href={profile.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Twitter size={16} />
                        <span className="text-sm">Twitter</span>
                      </a>
                    )}
                    {profile.linkedin && (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Linkedin size={16} />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Problems Solved</p>
                <p className="text-2xl font-bold text-green-400">{profile.stats.problemsSolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                <Target className="text-green-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contests Won</p>
                <p className="text-2xl font-bold text-yellow-400">{profile.stats.contestsWon}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                <Trophy className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Streak</p>
                <p className="text-2xl font-bold text-orange-400">{profile.stats.currentStreak} days</p>
              </div>
              <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Global Ranking</p>
                <p className="text-2xl font-bold text-blue-400">#{profile.stats.ranking}</p>
              </div>
              <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-blue-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="text-yellow-400" size={20} />
              Achievements
            </h3>
            <div className="space-y-3">
              {profile.achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.earned
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-gray-800/50 border-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        achievement.earned ? 'bg-yellow-400/20' : 'bg-gray-700/20'
                      }`}>
                        <IconComponent 
                          className={achievement.earned ? 'text-yellow-400' : 'text-gray-500'} 
                          size={16} 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.earned ? 'text-white' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Star className="text-yellow-400" size={16} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="text-blue-400" size={20} />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {profile.recentActivity.map((activity) => {
                const IconComponent = getActivityIcon(activity.type);
                const colorClass = getActivityColor(activity.type);
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gray-700`}>
                      <IconComponent className={colorClass} size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        {activity.type === 'problem_solved' && `Solved "${activity.description}"`}
                        {activity.type === 'contest_participated' && `Participated in ${activity.description}`}
                        {activity.type === 'achievement_earned' && `Earned achievement: ${activity.description}`}
                      </p>
                      {activity.difficulty && (
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      )}
                      {activity.rank && (
                        <span className="text-xs text-blue-400">Rank #{activity.rank}</span>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;