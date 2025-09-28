import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, BookOpen, Zap, Search, Trophy, Clock } from 'lucide-react'

const HomePage = () => {
  const featuredTopics = [
    {
      id: 1,
      title: "Arrays & Strings",
      description: "Master the fundamentals with array manipulation and string algorithms",
      difficulty: "Beginner",
      totalProblems: 45,
      category: "data-structures",
      topicId: "arrays",
      icon: "📊",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      title: "Sorting Algorithms",
      description: "Learn bubble sort, merge sort, quick sort and advanced techniques",
      difficulty: "Intermediate", 
      totalProblems: 32,
      category: "algorithms",
      topicId: "sorting",
      icon: "🔄",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Trees & Graphs",
      description: "Explore binary trees, BST, graph traversal and shortest paths",
      difficulty: "Advanced",
      totalProblems: 58,
      category: "data-structures", 
      topicId: "trees",
      icon: "🌳",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Dynamic Programming",
      description: "Master optimization problems with memoization and tabulation",
      difficulty: "Advanced",
      totalProblems: 41,
      category: "algorithms",
      topicId: "dynamic-programming", 
      icon: "⚡",
      color: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { label: "Data Structures", value: "15+", icon: Code2 },
    { label: "Algorithms", value: "50+", icon: Zap },
    { label: "Code Templates", value: "200+", icon: BookOpen },
    { label: "Languages", value: "4", icon: Trophy }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Master Data Structures
              <br />
              & Algorithms
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 mb-8 max-w-3xl mx-auto">
              Your comprehensive hub for learning DSA with interactive code templates, 
              detailed explanations, and real-world examples in multiple languages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/dsa-hub"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                data-testid="explore-dsa-btn"
              >
                <BookOpen className="mr-2" size={20} />
                Explore DSA Hub
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <button className="inline-flex items-center px-8 py-4 border-2 border-neutral-600 text-neutral-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                <Search className="mr-2" size={20} />
                Quick Search
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all">
                  <Icon className="mx-auto mb-3 text-blue-400" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-neutral-400 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>

          {/* Featured Topics */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Topics
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredTopics.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/topic/${topic.category}/${topic.topicId}`}
                  className="group block"
                  data-testid={`topic-card-${topic.topicId}`}
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{topic.icon}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          topic.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                          topic.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-neutral-400 mb-4 leading-relaxed">
                        {topic.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">
                          {topic.totalProblems} Templates
                        </span>
                        <ArrowRight className="text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Problem of the Day */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-800/50">
            <div className="flex items-center mb-6">
              <Trophy className="text-yellow-400 mr-3" size={32} />
              <h3 className="text-2xl font-bold text-white">Problem of the Day</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h4 className="text-xl font-semibold text-blue-300 mb-2">Two Sum Problem</h4>
                <p className="text-neutral-300 mb-4">
                  Given an array of integers and a target sum, find two numbers that add up to the target. 
                  Practice this fundamental algorithm problem.
                </p>
                <div className="flex items-center text-sm text-neutral-400">
                  <Clock size={16} className="mr-2" />
                  <span>Estimated time: 15-20 minutes</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link 
                  to="https://leetcode.com/problems/two-sum/description/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all"
                  data-testid="problem-of-day-btn"
                >
                  Try Now
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage