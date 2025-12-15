import { AIExplanationService } from '../services/AIExplanationService.js';

// Create singleton instance
const aiService = new AIExplanationService();

/**
 * Get AI explanation for problem
 */
export async function getExplanation(req, res, next) {
  try {
    const { problemId, code, language = 'javascript' } = req.body;

    // Validation
    if (!problemId) {
      return res.status(400).json({ error: 'Missing required field: problemId' });
    }
    if (!code) {
      return res.status(400).json({ error: 'Missing required field: code' });
    }

    // Get explanation
    const explanation = await aiService.getExplanation(problemId, code, language);

    return res.status(200).json({
      success: true,
      data: explanation,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Clear explanation cache
 */
export function clearCache(req, res, next) {
  try {
    aiService.clearCache();
    return res.status(200).json({
      success: true,
      message: 'Cache cleared successfully',
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats(req, res, next) {
  try {
    const stats = aiService.getCacheStats();
    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    return next(error);
  }
}
