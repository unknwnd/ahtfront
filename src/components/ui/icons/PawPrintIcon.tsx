import React from 'react';

interface PawPrintIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export const PawPrintIcon: React.FC<PawPrintIconProps> = ({ 
  className = '',
  width = 24,
  height = 24
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.25 9.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M11.25 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M15.75 9.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M12.75 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M5.055 15.984a2.701 2.701 0 0 0 2.2 1.266A2.7 2.7 0 0 0 9.75 15.75c0-1.558-.51-3.766-2.55-3.766-2.04 0-2.55 2.208-2.55 3.766 0 .748.302 1.682.405 2.234Z" />
      <path d="M14.703 15.75a2.7 2.7 0 0 0-2.494 1.5 2.701 2.701 0 0 0-2.201-1.266c-.103-.552-.405-1.486-.405-2.234 0-1.558.51-3.766 2.55-3.766 2.04 0 2.55 2.208 2.55 3.766Z" />
      <path d="M19.5 15.75c0-1.558-.51-3.766-2.55-3.766-2.04 0-2.55 2.208-2.55 3.766a2.7 2.7 0 0 0 2.495 2.7 2.7 2.7 0 0 0 2.55-2.25c.037-.23.055-.465.055-.45Z" />
    </svg>
  );
};

export default PawPrintIcon; 