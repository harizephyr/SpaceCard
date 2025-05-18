import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ value }) => {
  const [progress, setProgress] = useState(0);
  
  // Animation constants
  const size = 150;
  const strokeWidth = 8;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Emoji based on progress level
  const getEmoji = (value: number) => {
    if (value < 30) return '😐';
    if (value < 60) return '😊';
    if (value < 80) return '😄';
    return '🥳';
  };
  
  useEffect(() => {
    // Animate progress from 0 to the actual value
    const timer = setTimeout(() => {
      setProgress(value);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value]);
  
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_rgba(0,194,179,0.7)]"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7209b7" />
            <stop offset="100%" stopColor="#00c2b3" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        <motion.div
          className="text-3xl font-bold gradient-text"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.div>
        
        <motion.div
          className="text-3xl mt-1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {getEmoji(progress)}
        </motion.div>
      </div>
      
      {/* Pulsing glow effect */}
      <motion.div
        className="absolute w-full h-full rounded-full glow"
        animate={{
          boxShadow: [
            '0 0 15px rgba(114, 9, 183, 0.3), 0 0 30px rgba(0, 194, 179, 0.2)',
            '0 0 25px rgba(114, 9, 183, 0.5), 0 0 50px rgba(0, 194, 179, 0.3)',
            '0 0 15px rgba(114, 9, 183, 0.3), 0 0 30px rgba(0, 194, 179, 0.2)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default ProgressRing;