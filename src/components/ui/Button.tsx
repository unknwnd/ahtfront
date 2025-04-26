import React from 'react';
import LoadingIcon from './LoadingIcon';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'flat-primary' | 'flat-secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-depth-sm focus:ring-primary-300',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-depth-sm focus:ring-secondary-300',
    outline: 'border border-primary-300 bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-300',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-depth-sm focus:ring-red-300',
    'flat-primary': 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-flat-primary active:translate-y-0.5 active:shadow-none focus:ring-primary-300',
    'flat-secondary': 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-flat-secondary active:translate-y-0.5 active:shadow-none focus:ring-secondary-300',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm rounded-tg-sm',
    md: 'h-10 px-4 py-2 rounded-tg',
    lg: 'h-12 px-6 py-3 text-lg rounded-tg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyle,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <LoadingIcon size={size} className="mr-2" />
      )}
      {!isLoading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button; 