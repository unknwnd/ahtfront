import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useOptimizedAnimation } from '../hooks/useOptimizedAnimation';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pageTransition } = useOptimizedAnimation({
    duration: 0.2,
    easing: 'easeOut'
  });

  return (
    <motion.div
      {...pageTransition}
      className="w-full h-full font-sans"
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 