import React from 'react';
import { motion } from 'framer-motion';

const FloatingCards: React.FC = () => {
  const cards = [
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "Paris",
      delay: 0,
      rotate: -5,
      translateX: -20,
    },
    {
      id: 2,
      question: "Who wrote 'Hamlet'?",
      answer: "William Shakespeare",
      delay: 0.2,
      rotate: 3,
      translateX: 10,
    },
    {
      id: 3,
      question: "What is the formula for water?",
      answer: "H₂O",
      delay: 0.4,
      rotate: -2,
      translateX: -5,
    },
  ];
  
  return (
    <div className="relative h-[400px] md:h-[500px]">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className="absolute w-[280px] h-[180px] md:w-[320px] md:h-[200px] bg-neutral-800 rounded-xl p-6 card-shadow"
          style={{
            top: `${30 + card.id * 15}%`,
            left: '50%',
            x: `calc(-50% + ${card.translateX}px)`,
          }}
          initial={{ 
            opacity: 0, 
            y: 50,
            rotate: card.rotate,
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotate: card.rotate,
          }}
          transition={{ 
            delay: card.delay + 0.5, 
            duration: 0.8,
            y: {
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              repeatDelay: 1.5,
            }
          }}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-neutral-300 text-sm mb-2">Question:</h3>
            <p className="text-white font-medium text-lg mb-auto">{card.question}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= 3 ? 'bg-secondary' : 'bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <motion.div
                className="text-xs text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: card.delay + 1, duration: 0.5 }}
              >
                Next review: 3 days
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Glowing orb decoration */}
      <motion.div
        className="absolute bottom-0 right-0 w-[150px] h-[150px] rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-[30px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  );
};

export default FloatingCards;