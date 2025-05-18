import React from 'react';
import { motion } from 'framer-motion';

interface ControlClusterProps {
  onRatingClick: (rating: number) => void;
  isAnswerRevealed: boolean;
  selectedRating: number | null;
}

const ControlCluster: React.FC<ControlClusterProps> = ({
  onRatingClick,
  isAnswerRevealed,
  selectedRating,
}) => {
  const difficultyButtons = [
    { value: 1, label: 'Again', color: '#ef4444', emoji: '😓' },
    { value: 2, label: 'Hard', color: '#f59e0b', emoji: '😐' },
    { value: 3, label: 'Good', color: '#00c2b3', emoji: '😊' },
    { value: 4, label: 'Easy', color: '#10b981', emoji: '🥳' },
  ];
  
  const getNextReviewText = (rating: number) => {
    switch (rating) {
      case 1: return '10 minutes';
      case 2: return '1 day';
      case 3: return '3 days';
      case 4: return '7 days';
      default: return 'Unknown';
    }
  };
  
  return (
    <motion.div
      className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 card-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-white">How well did you know it?</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {difficultyButtons.map((button) => (
          <motion.button
            key={button.value}
            className={`py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${
              selectedRating === button.value
                ? 'bg-opacity-100 ring-2'
                : 'bg-opacity-50 hover:bg-opacity-70'
            }`}
            style={{
              backgroundColor: `${button.color}20`,
              color: button.color,
              ringColor: button.color,
            }}
            onClick={() => isAnswerRevealed && onRatingClick(button.value)}
            whileHover={{ scale: isAnswerRevealed ? 1.05 : 1 }}
            whileTap={{ scale: isAnswerRevealed ? 0.95 : 1 }}
            disabled={!isAnswerRevealed}
            animate={{
              opacity: isAnswerRevealed ? 1 : 0.5,
              y: isAnswerRevealed ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xl mb-1">{button.emoji}</span>
            <span className="text-sm font-medium">{button.label}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Confidence meter */}
      {selectedRating && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="text-neutral-300">Confidence</span>
            <span className="text-white font-medium">
              {selectedRating === 1 ? 'Low' : 
               selectedRating === 2 ? 'Medium' : 
               selectedRating === 3 ? 'Good' : 'High'}
            </span>
          </div>
          <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ 
                width: `${selectedRating * 25}%`,
                background: difficultyButtons[selectedRating - 1].color
              }}
              initial={{ width: 0 }}
              animate={{ width: `${selectedRating * 25}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
      
      {/* Next review prediction */}
      {selectedRating && (
        <motion.div
          className="mt-4 bg-neutral-700/30 p-3 rounded-lg flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="mr-2 text-sm">Next review:</div>
          <div className="bg-neutral-700/50 px-2 py-1 rounded-lg text-sm font-medium text-white">
            {getNextReviewText(selectedRating)}
          </div>
        </motion.div>
      )}
      
      {!isAnswerRevealed && (
        <div className="mt-4 text-center text-neutral-400 text-sm">
          Flip the card to see the answer first
        </div>
      )}
    </motion.div>
  );
};

export default ControlCluster;