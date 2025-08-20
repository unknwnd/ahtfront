import React, { memo } from 'react';
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

const GradientButton: React.FC<GradientButtonProps> = memo(({
  onClick,
  children,
  className = "",
  isSmall = false,
  fullWidth = false,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = `
    relative overflow-hidden
    ${isSmall ? 'px-3 py-1.5 text-sm' : 'px-6 py-3 text-base'}
    ${fullWidth ? 'w-full' : ''}
    bg-slate-800/90 backdrop-blur-sm
    border border-white/20
    text-white font-medium
    rounded-lg
    transition-all duration-200 ease-out
    ${disabled 
      ? 'opacity-50 cursor-not-allowed' 
      : 'hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95'
    }
  `;

  const gradientVariants = {
    initial: { width: '0%' },
    animate: { width: '100%' },
    hover: { 
      background: 'linear-gradient(-45deg, #FF7E1D, #121212, #FFFFFF, #8860d0)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : { scale: 0.95 }}
      style={{ willChange: 'transform' }}
    >
      {/* Контент кнопки */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Градиентная полоса внизу */}
      {!disabled && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 via-gray-900 via-white to-purple-500"
          variants={gradientVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
});

GradientButton.displayName = 'GradientButton';

export default GradientButton; 