import { VisualizerFactory } from '../services/AlgorithmVisualizer.js';

/**
 * Run algorithm visualization
 */
export async function runVisualizer(req, res, next) {
  try {
    const { algorithm, input } = req.body;

    // Validation
    if (!algorithm) {
      return res.status(400).json({ error: 'Missing required field: algorithm' });
    }
    if (!input) {
      return res.status(400).json({ error: 'Missing required field: input' });
    }

    // Create visualizer using factory pattern
    const visualizer = VisualizerFactory.createVisualizer(algorithm);

    // Run visualization
    const result = visualizer.visualize(input);

    return res.status(200).json({
      success: true,
      data: result,
      metadata: visualizer.getMetadata(),
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Get supported algorithms
 */
export function getSupportedAlgorithms(req, res, next) {
  try {
    const algorithms = VisualizerFactory.getSupportedAlgorithms();
    const details = algorithms.map(algo => {
      const visualizer = VisualizerFactory.createVisualizer(algo);
      return {
        name: algo,
        metadata: visualizer.getMetadata(),
      };
    });

    return res.status(200).json({
      success: true,
      algorithms: details,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Get algorithm metadata
 */
export function getAlgorithmMetadata(req, res, next) {
  try {
    const { algorithm } = req.params;

    if (!algorithm) {
      return res.status(400).json({ error: 'Missing required parameter: algorithm' });
    }

    const visualizer = VisualizerFactory.createVisualizer(algorithm);
    const metadata = visualizer.getMetadata();

    return res.status(200).json({
      success: true,
      metadata,
    });
  } catch (error) {
    return next(error);
  }
}
