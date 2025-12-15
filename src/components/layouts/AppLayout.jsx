import React from 'react';
import { EnhancedNavbar } from '../Navbar/navbar';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Code,
  Trophy,
  User,
  BarChart3,
  Settings,
  BookOpen,
  Play,
  Target,
  Activity,
  Zap,
  Code2
} from 'lucide-react';

export const AppLayout = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const appNavItems = [
    {
      name: "Dashboard",
      link: "/",
      icon: Home,
      public: true
    },
    {
      name: "Problems",
      link: "/problems",
      icon: Code,
      public: true
    },
    {
      name: "Contests",
      link: "/contests",
      icon: Trophy,
      public: true
    },
    {
      name: "Visualizer",
      link: "/visualizer",
      icon: Play,
      public: true
    }
  ];

  const userNavItems = [
    {
      name: "Profile",
      link: "/profile",
      icon: User,
      public: false
    },
    {
      name: "Statistics",
      link: "/statistics",
      icon: BarChart3,
      public: false
    },
    {
      name: "Activity",
      link: "/activity",
      icon: Activity,
      public: false
    },
    {
      name: "Settings",
      link: "/settings",
      icon: Settings,
      public: false
    }
  ];

  const isCurrentPath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Code2 size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DSA Hub
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Platform
          </div>
          {appNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isCurrentPath(item.link);
            return (
              <Link
                key={item.name}
                to={item.link}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Navigation */}
        {isAuthenticated && (
          <div className="mt-8 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Account
            </div>
            {userNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = isCurrentPath(item.link);
              return (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* User Info */}
      {isAuthenticated && user && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user.fullName?.charAt(0) || user.username?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.fullName || user.username}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <EnhancedNavbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};