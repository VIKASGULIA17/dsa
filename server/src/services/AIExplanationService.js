import axios from 'axios';
import NodeCache from 'node-cache';

/**
 * AI Explanation Service
 * Wraps LinkedIn AI API (or other AI providers) with caching and fallbacks
 */
export class AIExplanationService {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.LINKEDIN_AI_API_KEY;
    this.apiEndpoint = config.apiEndpoint || process.env.LINKEDIN_AI_ENDPOINT;
    this.timeout = config.timeout || 30000;
    this.cache = new NodeCache({ stdTTL: config.cacheTTL || 3600, checkperiod: 600 });
    this.fallbackEnabled = config.fallbackEnabled !== false;
  }

  /**
   * Get AI explanation for a problem
   * @param {string} problemId - ID of the problem
   * @param {string} code - Code to explain
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Explanation result
   */
  async getExplanation(problemId, code, language = 'javascript') {
    const cacheKey = this.generateCacheKey(problemId, code);

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return { ...cached, source: 'cache' };
    }

    try {
      const explanation = await this.callAIAPI(problemId, code, language);
      this.cache.set(cacheKey, explanation);
      return { ...explanation, source: 'api' };
    } catch (error) {
      console.error('AI API error:', error.message);

      if (this.fallbackEnabled) {
        return this.getFallbackExplanation(problemId, code, language);
      }

      throw new Error(`Failed to get AI explanation: ${error.message}`);
    }
  }

  /**
   * Call the actual AI API
   * @private
   */
  async callAIAPI(problemId, code, language) {
    if (!this.apiKey || !this.apiEndpoint) {
      throw new Error('AI API credentials not configured');
    }

    try {
      const response = await axios.post(
        this.apiEndpoint,
        {
          problem_id: problemId,
          code,
          language,
          explain_depth: 'detailed',
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: this.timeout,
        }
      );

      if (!response.data || !response.data.explanation) {
        throw new Error('Invalid API response format');
      }

      return {
        explanation: response.data.explanation,
        complexity: response.data.complexity,
        improvements: response.data.improvements || [],
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API credentials');
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('AI API request timeout');
      }
      throw error;
    }
  }

  /**
   * Fallback explanation using heuristics
   * @private
   */
  getFallbackExplanation(problemId, code, language) {
    const codeLength = code.length;
    const hasComments = code.includes('//') || code.includes('/*');
    const complexity = this.analyzeComplexity(code);

    return {
      explanation: this.generateBasicExplanation(code, language),
      complexity,
      improvements: this.generateImprovements(code),
      timestamp: new Date().toISOString(),
      source: 'fallback',
      disclaimer: 'This is a generated fallback explanation as AI API is unavailable',
    };
  }

  /**
   * Analyze code complexity heuristically
   * @private
   */
  analyzeComplexity(code) {
    let timeComplexity = 'O(n)';
    let spaceComplexity = 'O(1)';

    if (code.includes('for') && code.includes('for') && code.match(/for.*for/)) {
      timeComplexity = 'O(n²)';
    }
    if (code.includes('while') && code.includes('while')) {
      timeComplexity = 'O(n log n)';
    }
    if (code.includes('recursion') || code.includes('recursive')) {
      spaceComplexity = 'O(n)';
    }
    if (code.includes('new Array') || code.includes('new Set') || code.includes('new Map')) {
      spaceComplexity = 'O(n)';
    }

    return { time: timeComplexity, space: spaceComplexity };
  }

  /**
   * Generate basic explanation from code
   * @private
   */
  generateBasicExplanation(code, language) {
    const lines = code.split('\n').filter(line => line.trim());
    const keywordCount = (code.match(/function|class|const|let|var|if|for|while/g) || []).length;

    return `This ${language} code contains ${lines.length} lines with ${keywordCount} key control structures. ` +
           `The code uses various programming constructs to solve the given problem. ` +
           `Key observations: The solution employs fundamental algorithms and data structures. ` +
           `For a detailed AI-powered explanation, ensure your LinkedIn AI API credentials are configured.`;
  }

  /**
   * Generate improvement suggestions
   * @private
   */
  generateImprovements(code) {
    const suggestions = [];

    if (!code.includes('//') && !code.includes('/*')) {
      suggestions.push('Add comments to explain complex logic');
    }

    if (code.includes('var ')) {
      suggestions.push('Consider using const/let instead of var for better scoping');
    }

    if (code.match(/\s{2,}/g)?.length > 10) {
      suggestions.push('Code could be more concise');
    }

    if (code.includes('Math.pow')) {
      suggestions.push('Consider using ** operator for exponentiation');
    }

    return suggestions;
  }

  /**
   * Generate cache key
   * @private
   */
  generateCacheKey(problemId, code) {
    // Simple hash of problem ID and code for caching
    return `${problemId}_${code.substring(0, 100).replace(/\s/g, '').hashCode()}`;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.flushAll();
  }

  /**
   * Get cache stats
   */
  getCacheStats() {
    return this.cache.getStats();
  }
}

/**
 * Simple hash function for strings
 */
if (!String.prototype.hashCode) {
  // eslint-disable-next-line no-extend-native
  String.prototype.hashCode = function hashCode() {
    let hash = 0;
    if (this.length === 0) return hash.toString();
    for (let i = 0; i < this.length; i++) {
      const char = this.charCodeAt(i);
      // eslint-disable-next-line no-bitwise
      hash = ((hash << 5) - hash) + char;
      // eslint-disable-next-line no-bitwise
      hash = hash & hash;
    }
    return Math.abs(hash).toString();
  };
}
