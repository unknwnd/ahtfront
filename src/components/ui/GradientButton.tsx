import React from 'react';
import { motion } from 'framer-motion';

export interface GradientButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isSmall?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  onClick,
  children,
  className = "",
  isSmall = false,
  fullWidth = false,
  disabled = false,
  type = 'button',
  ...props
}) => {
  return (
    <motion.button
      type={type}
      className={`relative overflow-hidden rounded-full ${isSmall ? 'px-8 py-3' : 'px-12 py-4'} text-white ${isSmall ? 'text-sm' : 'text-base sm:text-lg'} font-medium group cursor-pointer ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { 
        scale: 1.05, 
        boxShadow: "0 0 25px rgba(255, 126, 29, 0.4), 0 0 50px rgba(136, 96, 208, 0.3)" 
      } : undefined}
      whileTap={!disabled ? { 
        scale: 0.95, 
        boxShadow: "0 0 5px rgba(255, 255, 255, 0.4)" 
      } : undefined}
      animate={{
        boxShadow: ["0 0 10px rgba(255, 126, 29, 0.3)", "0 0 20px rgba(136, 96, 208, 0.4)", "0 0 10px rgba(255, 126, 29, 0.3)"],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      onClick={!disabled ? onClick : undefined}
      style={{
        background: "rgba(25, 30, 45, 0.9)",  // темный фон с прозрачностью
        backdropFilter: "blur(8px)",          // размытие фона
        border: "1px solid rgba(255, 255, 255, 0.2)" // тонкая рамка
      }}
      {...props}
    >
      {/* Градиентная полоса внизу кнопки */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(to right, #FF7E1D, #121212, #FFFFFF, #8860d0)",
          boxShadow: "0 0 8px rgba(136, 96, 208, 0.6)"
        }}
        initial={{ scaleX: 0.3, opacity: 0.6 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />
      
      {/* Анимация наведения - градиентная заливка */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-orange-500/40 via-gray-900/40 to-purple-500/40 z-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.span className="relative z-10">
        {children}
      </motion.span>
    </motion.button>
  );
};

export default GradientButton; 