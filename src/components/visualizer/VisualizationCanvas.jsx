import React from 'react';
import { motion } from 'motion/react';

const VisualizationCanvas = ({ stepData }) => {
  if (!stepData) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800 text-gray-500">
        Run algorithm to see visualization
      </div>
    );
  }

  const { array, activeIndices, swapped, description } = stepData;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-end justify-center gap-2 p-8 bg-gray-900 rounded-lg border border-gray-800 min-h-96 overflow-x-auto">
        {array && array.map((value, idx) => {
          const isActive = activeIndices && activeIndices.includes(idx);
          const isSorted = false; // Could add this to state
          
          let bgColor = 'bg-blue-500';
          if (isActive) {
             bgColor = swapped ? 'bg-red-500' : 'bg-yellow-500';
          }
          
          return (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                height: `${Math.max(20, value * 5)}px`,
                backgroundColor: isActive ? (swapped ? '#ef4444' : '#eab308') : '#3b82f6'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-12 rounded-t-md flex items-end justify-center pb-2 text-white font-bold shadow-lg`}
            >
              <span className="mb-2">{value}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white">Step Info</h3>
        <p className="text-gray-300">{description || 'No description'}</p>
      </div>
    </div>
  );
};

export default VisualizationCanvas;
