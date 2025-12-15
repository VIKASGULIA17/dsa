import express from 'express';
import {
  executeCode,
  initializeTestCases,
  getTestCases,
  clearTestCases,
} from '../controllers/executionController.js';

const router = express.Router();

/**
 * POST /api/execute/run
 * Execute code against test cases
 */
router.post('/run', executeCode);

/**
 * POST /api/execute/init-tests
 * Initialize test cases for a problem
 */
router.post('/init-tests', initializeTestCases);

/**
 * GET /api/execute/tests/:problemId
 * Get test cases for a problem
 */
router.get('/tests/:problemId', getTestCases);

/**
 * DELETE /api/execute/tests/:problemId
 * Clear test cases for a problem
 */
router.delete('/tests/:problemId', clearTestCases);

export default router;
