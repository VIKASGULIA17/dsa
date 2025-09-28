import React from 'react'
import { Link } from 'react-router-dom'
import { dsaCategories } from '../data/DsaTopics'
import { Code2, BookOpen, ArrowRight, Star, TrendingUp } from 'lucide-react'

const DSAHubPage = () => {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-900/30 border-green-700'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700'
      case 'Advanced': return 'text-red-400 bg-red-900/30 border-red-700'
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700'
    }
  }

  const getTopicIcon = (topicKey) => {
    const icons = {
      'arrays': '📊',
      'linked-lists': '🔗',
      'stacks': '📚',
      'queues': '🎫',
      'trees': '🌳',
      'graphs': '🕸️',
      'sorting': '🔄',
      'searching': '🔍',
      'dynamic-programming': '⚡',
      'greedy': '🎯'
    }
    return icons[topicKey] || '💡'
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DSA Learning Hub
            </span>
          </h1>
          <p className="text-xl text-neutral-400 mb-8 max-w-3xl mx-auto">
            Comprehensive collection of Data Structures and Algorithms with detailed explanations, 
            code implementations in multiple languages, and complexity analysis.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-neutral-400">Topics</div>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <div className="text-2xl font-bold text-green-400">200+</div>
              <div className="text-sm text-neutral-400">Code Examples</div>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <div className="text-2xl font-bold text-purple-400">4</div>
              <div className="text-sm text-neutral-400">Languages</div>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <div className="text-2xl font-bold text-yellow-400">∞</div>
              <div className="text-sm text-neutral-400">Learning</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-16">
          {Object.entries(dsaCategories).map(([categoryKey, category]) => (
            
            <section key={categoryKey} className="space-y-8">
              
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {category.title}
                  </h2>
                  <p className="text-neutral-400">{category.description}</p>
                </div>
                <div className="hidden md:flex items-center space-x-2 text-sm text-neutral-500">
                  <TrendingUp size={16} />
                  <span>{Object.keys(category.topics).length} Topics</span>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(category.topics).map(([topicKey, topic]) => {
                  const templateCount = Object.keys(topic.codeTemplates || {}).length
                  
                  return (
                    <Link
                      key={topicKey}
                      to={`/topic/${categoryKey}/${topicKey}`}
                      className="group block"
                      data-testid={`topic-${topicKey}`}
                    >
                      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-6 hover:border-neutral-600 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl h-full">
                        
                        {/* Topic Header */}
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-3xl">{getTopicIcon(topicKey)}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(topic.difficulty)}`}>
                            {topic.difficulty}
                          </span>
                        </div>

                        {/* Topic Content */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                          {topic.title}
                        </h3>
                        
                        <p className="text-neutral-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {topic.description}
                        </p>

                        {/* Topic Stats */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-neutral-500">
                              <Code2 size={14} className="mr-1" />
                              <span>{templateCount} Templates</span>
                            </div>
                            <div className="flex items-center text-neutral-500">
                              <BookOpen size={14} className="mr-1" />
                              <span>Theory</span>
                            </div>
                          </div>
                          <ArrowRight 
                            size={16} 
                            className="text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" 
                          />
                        </div>

                        {/* Complexity Indicator */}
                        <div className="mt-4 pt-4 border-t border-neutral-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500">Time Complexity</span>
                            <div className="flex items-center space-x-1">
                              {topic.theory?.timeComplexity && (
                                <span className="text-xs bg-neutral-800 px-2 py-1 rounded font-mono text-green-400">
                                  {Object.values(topic.theory.timeComplexity)[0]?.average || 'Varies'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-800/50">
            <Star className="mx-auto mb-4 text-yellow-400" size={48} />
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Choose any topic above to dive deep into theory, explore code implementations, 
              and master the concepts with hands-on practice.
            </p>
            <Link 
              to="/about"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <BookOpen className="mr-2" size={20} />
              Learn About This Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DSAHubPage