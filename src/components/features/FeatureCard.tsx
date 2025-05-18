import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  delay = 0,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: delay,
      }
    },
    hover: { 
      y: -10,
      boxShadow: '0 0 25px rgba(114, 9, 183, 0.3), 0 0 50px rgba(0, 194, 179, 0.2)',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };
  
  return (
    <motion.div
      className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 card-shadow flex flex-col h-full"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="mb-5 p-3 rounded-lg inline-block bg-neutral-700/50">
        {icon}
      </div>
      
      <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">{title}</h3>
      
      <p className="text-neutral-300 mb-6 flex-grow">
        {description}
      </p>
      
      <motion.a
        href="#"
        className="text-secondary font-medium inline-flex items-center"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        Learn more 
        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </motion.div>
  );
};

export default FeatureCard;