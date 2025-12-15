import express from 'express';
import {
  runVisualizer,
  getSupportedAlgorithms,
  getAlgorithmMetadata,
} from '../controllers/visualizerController.js';

const router = express.Router();

/**
 * POST /api/visualizer/run
 * Run algorithm visualization with given input
 */
router.post('/run', runVisualizer);

/**
 * GET /api/visualizer/algorithms
 * Get list of supported algorithms
 */
router.get('/algorithms', getSupportedAlgorithms);

/**
 * GET /api/visualizer/algorithms/:algorithm
 * Get metadata for a specific algorithm
 */
router.get('/algorithms/:algorithm', getAlgorithmMetadata);

export default router;
