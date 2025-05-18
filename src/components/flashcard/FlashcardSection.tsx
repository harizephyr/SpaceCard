import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FlashcardDeck from './FlashcardDeck';
import ProgressTracker from './ProgressTracker';
import ControlCluster from './ControlCluster';
import { mockFlashcards } from '../../data/mockData';

const FlashcardSection: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studiedCards, setStudiedCards] = useState<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  
  // Reset revealed state when changing cards
  useEffect(() => {
    setIsRevealed(false);
    setConfidence(null);
  }, [currentCardIndex]);
  
  const handleCardFlip = () => {
    setIsRevealed(!isRevealed);
  };
  
  const handleDifficultyRating = (rating: number) => {
    // Record the difficulty rating (1-4, with 4 being easiest)
    setConfidence(rating);
    
    // Mark the card as studied if it wasn't already
    if (!studiedCards.includes(currentCardIndex)) {
      setStudiedCards([...studiedCards, currentCardIndex]);
    }
    
    // Move to next card after a short delay
    setTimeout(() => {
      const nextIndex = (currentCardIndex + 1) % mockFlashcards.length;
      setCurrentCardIndex(nextIndex);
    }, 800);
  };
  
  const progress = Math.round((studiedCards.length / mockFlashcards.length) * 100);
  
  return (
    <motion.section
      id="flashcard-section"
      className="py-20 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Your Study Session</h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Learn effectively with spaced repetition flashcards. Rate your confidence 
            to optimize your review schedule.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FlashcardDeck
              cards={mockFlashcards}
              currentIndex={currentCardIndex}
              isFlipped={isRevealed}
              onCardClick={handleCardFlip}
            />
          </div>
          
          <div className="flex flex-col gap-6">
            <ProgressTracker 
              progress={progress} 
              totalCards={mockFlashcards.length}
              studiedCards={studiedCards.length}
            />
            
            <ControlCluster
              onRatingClick={handleDifficultyRating}
              isAnswerRevealed={isRevealed}
              selectedRating={confidence}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FlashcardSection;