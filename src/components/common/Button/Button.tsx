import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white focus:ring-primary-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white focus:ring-gray-500',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white disabled:border-gray-300 disabled:text-gray-300 focus:ring-primary-500',
    ghost: 'text-primary-500 hover:bg-primary-50 disabled:text-gray-300 focus:ring-primary-500',
    danger: 'bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white focus:ring-red-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={combinedClasses}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="white" />
          <span>{loadingText || 'Loading...'}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </>
      )}
    </button>
  );
};

export default Button;