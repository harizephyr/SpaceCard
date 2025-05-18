import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  const [scope, animate] = useAnimate();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const magneticPull = 0.4; // Strength of the magnetic effect
    
    const moveX = ((x - width / 2) * magneticPull).toFixed(1);
    const moveY = ((y - height / 2) * magneticPull).toFixed(1);
    
    animate(scope.current, { 
      x: moveX, 
      y: moveY 
    }, { 
      type: "spring", 
      stiffness: 150, 
      damping: 15, 
      mass: 0.1 
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    animate(scope.current, { x: 0, y: 0 }, { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    });
  };
  
  const handleClick = () => {
    animate(scope.current, { scale: 0.95 }, { duration: 0.1 });
    setTimeout(() => {
      animate(scope.current, { scale: 1 }, { duration: 0.1 });
    }, 100);
    
    if (onClick) onClick();
  };
  
  return (
    <div
      ref={buttonRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        ref={scope}
        className={className}
        whileHover={{ scale: 1.05 }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.div>
      
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          layoutId="buttonHighlight"
        />
      )}
    </div>
  );
};

export default MagneticButton;