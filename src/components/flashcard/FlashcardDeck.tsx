import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flashcard } from '../../types';

interface FlashcardDeckProps {
  cards: Flashcard[];
  currentIndex: number;
  isFlipped: boolean;
  onCardClick: () => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  currentIndex,
  isFlipped,
  onCardClick,
}) => {
  // Show max 3 cards in the stack
  const visibleCards = [
    cards[currentIndex],
    cards[(currentIndex + 1) % cards.length],
    cards[(currentIndex + 2) % cards.length],
  ];
  
  return (
    <div className="relative h-[400px] md:h-[450px] w-full">
      {/* Stack of cards */}
      {visibleCards.map((card, index) => (
        index > 0 && (
          <div
            key={`stack-${index}`}
            className="absolute top-0 left-0 right-0 h-[400px] md:h-[450px] bg-neutral-800 rounded-2xl pointer-events-none"
            style={{
              zIndex: 10 - index,
              transform: `translateY(${index * 15}px) scale(${1 - index * 0.05})`,
              opacity: 1 - index * 0.2,
            }}
          />
        )
      ))}
      
      {/* Active card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`card-${currentIndex}`}
          className="card-container relative w-full h-[400px] md:h-[450px] cursor-pointer"
          initial={{ opacity: 0, rotateY: 0 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.3 }}
          onClick={onCardClick}
        >
          <motion.div
            className={`card relative w-full h-full ${isFlipped ? 'flipped' : ''}`}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Front of card */}
            <div className="card-front bg-neutral-800 rounded-2xl p-8 flex flex-col">
              <div className="text-neutral-400 text-sm mb-4">Question</div>
              <div className="text-white text-xl md:text-2xl font-medium flex-grow flex items-center justify-center">
                {cards[currentIndex]?.question}
              </div>
              <div className="text-neutral-400 text-sm mt-4 text-center">
                Tap to reveal answer
              </div>
            </div>
            
            {/* Back of card */}
            <div className="card-back bg-neutral-800 rounded-2xl p-8 flex flex-col">
              <div className="text-neutral-400 text-sm mb-4">Answer</div>
              <div className="text-white text-xl md:text-2xl font-medium flex-grow flex items-center justify-center">
                {cards[currentIndex]?.answer}
              </div>
              <div className="text-neutral-400 text-sm mt-4 text-center">
                Rate your confidence below
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Card counter */}
      <div className="absolute bottom-4 right-4 bg-neutral-700/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-neutral-300">
        {currentIndex + 1} / {cards.length}
      </div>
    </div>
  );
};

export default FlashcardDeck;