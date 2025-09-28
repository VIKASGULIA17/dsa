import React from 'react'
import { Clock, Zap, Lightbulb, Target, BookOpen, BarChart3 } from 'lucide-react'

export const TheorySection = ({ theory, topicTitle }) => {
  const getComplexityColor = (complexity) => {
    if (complexity.includes('1')) return 'text-green-400 bg-green-900/30'
    if (complexity.includes('log')) return 'text-blue-400 bg-blue-900/30'
    if (complexity.includes('n²') || complexity.includes('n^2')) return 'text-red-400 bg-red-900/30'
    if (complexity.includes('n')) return 'text-yellow-400 bg-yellow-900/30'
    return 'text-gray-400 bg-gray-900/30'
  }

  return (
    <div className="space-y-12">
      {/* Definition Section */}
      <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-800/30">
        <div className="flex items-center mb-6">
          <BookOpen className="text-blue-400 mr-3" size={32} />
          <h2 className="text-3xl font-bold text-white">What is {topicTitle}?</h2>
        </div>
        <p className="text-lg text-neutral-200 leading-relaxed">
          {theory.definition}
        </p>
      </section>

      {/* Real World Analogy */}
      <section className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-800/30">
        <div className="flex items-center mb-6">
          <Lightbulb className="text-green-400 mr-3" size={32} />
          <h2 className="text-3xl font-bold text-white">Real-World Analogy</h2>
        </div>
        <p className="text-lg text-neutral-200 leading-relaxed">
          {theory.realWorldAnalogy}
        </p>
      </section>

      {/* Core Operations */}
      <section className="bg-neutral-900/30 rounded-2xl p-8 border border-neutral-800">
        <div className="flex items-center mb-6">
          <Target className="text-purple-400 mr-3" size={32} />
          <h2 className="text-3xl font-bold text-white">Core Operations</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {theory.coreOperations.map((operation, index) => (
            <div key={index} className="flex items-center p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
              <span className="text-neutral-200 font-medium">{operation}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Time Complexity Analysis */}
      {theory.timeComplexity && (
        <section className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl p-8 border border-orange-800/30">
          <div className="flex items-center mb-8">
            <Clock className="text-orange-400 mr-3" size={32} />
            <h2 className="text-3xl font-bold text-white">Time Complexity Analysis</h2>
          </div>
          
          <div className="grid gap-6">
            {Object.entries(theory.timeComplexity).map(([operation, complexities]) => (
              <div key={operation} className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-xl font-semibold text-white mb-4 capitalize">
                  {operation.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(complexities).map(([scenario, complexity]) => (
                    <div key={scenario} className="text-center">
                      <div className="text-sm text-neutral-400 mb-2 capitalize">{scenario} Case</div>
                      <div className={`px-4 py-2 rounded-lg font-mono font-bold ${getComplexityColor(complexity)}`}>
                        {complexity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Space Complexity */}
      {theory.spaceComplexity && (
        <section className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-cyan-800/30">
          <div className="flex items-center mb-6">
            <BarChart3 className="text-cyan-400 mr-3" size={32} />
            <h2 className="text-3xl font-bold text-white">Space Complexity</h2>
          </div>
          <div className="text-center">
            <div className="text-sm text-neutral-400 mb-3">Memory Usage</div>
            <div className={`inline-block px-6 py-3 rounded-xl font-mono font-bold text-xl ${getComplexityColor(theory.spaceComplexity)}`}>
              {theory.spaceComplexity}
            </div>
            <p className="text-neutral-300 mt-4 max-w-2xl mx-auto">
              This represents the additional memory space required by the algorithm relative to the input size.
            </p>
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      <section className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-2xl p-8 border border-indigo-800/30">
        <div className="flex items-center mb-6">
          <Zap className="text-indigo-400 mr-3" size={32} />
          <h2 className="text-3xl font-bold text-white">Key Takeaways</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">When to Use</h3>
            <div className="text-neutral-300">
              <p>Consider using {topicTitle.toLowerCase()} when:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>You need efficient data organization</li>
                <li>Performance is critical</li>
                <li>Memory usage is a concern</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Advantages</h3>
            <div className="text-neutral-300">
              <p>Key benefits include:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Optimized performance</li>
                <li>Well-understood behavior</li>
                <li>Wide language support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}