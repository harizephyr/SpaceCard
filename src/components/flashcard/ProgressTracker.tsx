import React from 'react';
import { motion } from 'framer-motion';

interface ProgressTrackerProps {
  progress: number;
  totalCards: number;
  studiedCards: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  totalCards,
  studiedCards,
}) => {
  return (
    <motion.div
      className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 card-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-white">Session Progress</h3>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-neutral-300 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-700/50 rounded-lg p-4 text-center">
          <motion.div
            className="text-2xl font-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {studiedCards}
          </motion.div>
          <div className="text-neutral-400 text-sm">Cards Studied</div>
        </div>
        
        <div className="bg-neutral-700/50 rounded-lg p-4 text-center">
          <motion.div
            className="text-2xl font-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {totalCards - studiedCards}
          </motion.div>
          <div className="text-neutral-400 text-sm">Cards Remaining</div>
        </div>
      </div>
      
      {/* Estimated completion */}
      <div className="mt-6 bg-neutral-700/30 rounded-lg p-3 flex items-center">
        <div className="w-3 h-3 rounded-full bg-secondary animate-pulse-glow mr-2"/>
        <div className="text-sm text-neutral-300">
          Estimated completion: <span className="text-white font-medium">15 minutes</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;