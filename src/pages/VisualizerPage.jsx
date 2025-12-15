import React, { useState, useEffect, useRef } from 'react';
import { api } from '../lib/api';
import AlgorithmSelector from '../components/visualizer/AlgorithmSelector';
import InputConfigurator from '../components/visualizer/InputConfigurator';
import VisualizationCanvas from '../components/visualizer/VisualizationCanvas';
import VisualizerControls from '../components/visualizer/VisualizerControls';

const VisualizerPage = () => {
  const [algorithm, setAlgorithm] = useState('bubble-sort');
  const [input, setInput] = useState([5, 12, 8, 3, 17, 1]);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  const runAlgorithm = async () => {
    setLoading(true);
    setIsPlaying(false);
    try {
      const response = await api.visualizer.run(algorithm, input);
      setHistory(response.steps);
      setCurrentStep(0);
    } catch (error) {
      console.error("Failed to run algorithm", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAlgorithm();
  }, [algorithm, input]); // Re-run when algorithm or input changes

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < history.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 500); // Speed control could be added
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, history]);

  const handleStepChange = (step) => {
    setCurrentStep(step);
    setIsPlaying(false);
  };

  const currentStepData = history[currentStep];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Algorithm Visualizer Workspace
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-white">Configuration</h2>
            <AlgorithmSelector selected={algorithm} onSelect={setAlgorithm} />
            <InputConfigurator initialInput={input} onInputChange={setInput} />
            <button
              onClick={runAlgorithm}
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-md font-medium transition-colors mt-2"
            >
              {loading ? 'Simulating...' : 'Reset & Run'}
            </button>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
             <h2 className="text-xl font-semibold mb-4 text-white">Legend</h2>
             <div className="space-y-2 text-sm">
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-blue-500 rounded"></div>
                 <span className="text-gray-300">Unsorted</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                 <span className="text-gray-300">Comparing</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-red-500 rounded"></div>
                 <span className="text-gray-300">Swapping</span>
               </div>
             </div>
          </div>
        </div>

        {/* Main Visualization Area */}
        <div className="lg:col-span-3 space-y-6">
          <VisualizationCanvas stepData={currentStepData} />
          <VisualizerControls 
            isPlaying={isPlaying} 
            onPlayPause={() => setIsPlaying(!isPlaying)}
            currentStep={currentStep}
            totalSteps={history.length}
            onStepChange={handleStepChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VisualizerPage;
