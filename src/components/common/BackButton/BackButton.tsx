import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'prominent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  to,
  label = 'Back',
  className = '',
  variant = 'default',
  size = 'md',
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back in history
    }
  };

  const variantClasses = {
    default: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md',
    minimal: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    prominent: 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl',
    ghost: 'text-gray-500 hover:text-primary-500 hover:bg-primary-50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const baseClasses = 'inline-flex items-center space-x-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95';

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={`${label} to previous page`}
      type="button"
    >
      <ArrowLeft 
        className={iconSizeClasses[size]} 
        aria-hidden="true"
      />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;