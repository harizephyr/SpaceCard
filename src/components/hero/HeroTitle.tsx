import React from 'react';
import { motion } from 'framer-motion';

const HeroTitle: React.FC = () => {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };
  
  const title = "Master Knowledge with the Science of Memory";
  
  return (
    <motion.h1
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
      variants={titleVariants}
      initial="hidden"
      animate="visible"
    >
      {title.split(' ').map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {wordIndex > 0 && ' '}
          <span className={wordIndex === 2 || wordIndex === 7 ? 'gradient-text' : ''}>
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </motion.h1>
  );
};

export default HeroTitle;