import React from 'react';
import { Play, Pause, SkipBack, SkipForward, StepBack, StepForward } from 'lucide-react';

const VisualizerControls = ({ 
  isPlaying, 
  onPlayPause, 
  currentStep, 
  totalSteps, 
  onStepChange,
  onReset
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={() => onStepChange(0)}
          disabled={currentStep === 0}
          className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Reset"
        >
          <SkipBack className="w-5 h-5 text-gray-300" />
        </button>
        <button 
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0}
          className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous Step"
        >
          <StepBack className="w-5 h-5 text-gray-300" />
        </button>
        <button 
          onClick={onPlayPause}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
        </button>
        <button 
          onClick={() => onStepChange(currentStep + 1)}
          disabled={currentStep >= totalSteps - 1}
          className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next Step"
        >
          <StepForward className="w-5 h-5 text-gray-300" />
        </button>
         <button 
          onClick={() => onStepChange(totalSteps - 1)}
          disabled={currentStep >= totalSteps - 1}
          className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Skip to End"
        >
          <SkipForward className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 w-12 text-right">{currentStep}</span>
        <input 
          type="range" 
          min="0" 
          max={totalSteps > 0 ? totalSteps - 1 : 0} 
          value={currentStep} 
          onChange={(e) => onStepChange(parseInt(e.target.value))}
          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-400 w-12">{totalSteps > 0 ? totalSteps - 1 : 0}</span>
      </div>
    </div>
  );
};

export default VisualizerControls;
