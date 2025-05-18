import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/hero/HeroSection';
import FeaturesSection from './components/features/FeaturesSection';
import DemoSection from './components/demo/DemoSection';
import FlashcardSection from './components/flashcard/FlashcardSection';
import Footer from './components/Footer';

function App() {
  const [showFlashcards, setShowFlashcards] = useState(false);
  
  const handleGetStarted = () => {
    setShowFlashcards(true);
    
    // Scroll to flashcard section
    setTimeout(() => {
      const flashcardSection = document.getElementById('flashcard-section');
      if (flashcardSection) {
        flashcardSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800">
      <Navbar />
      
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
        <DemoSection />
        
        <AnimatePresence>
          {showFlashcards && (
            <FlashcardSection />
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;