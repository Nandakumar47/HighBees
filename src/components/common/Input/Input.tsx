import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseInputClasses = 'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
  const iconClasses = Icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';
  
  const inputClasses = `${baseInputClasses} ${errorClasses} ${iconClasses} ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon 
            className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${
              iconPosition === 'left' ? 'left-3' : 'right-3'
            }`} 
          />
        )}
        <input
          id={inputId}
          className={inputClasses}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;