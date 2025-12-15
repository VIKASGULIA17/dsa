import express from 'express';
import {
  getExplanation,
  clearCache,
  getCacheStats,
} from '../controllers/aiController.js';

const router = express.Router();

/**
 * POST /api/ai/explain
 * Get AI explanation for a problem
 */
router.post('/explain', getExplanation);

/**
 * POST /api/ai/cache/clear
 * Clear explanation cache
 */
router.post('/cache/clear', clearCache);

/**
 * GET /api/ai/cache/stats
 * Get cache statistics
 */
router.get('/cache/stats', getCacheStats);

export default router;
