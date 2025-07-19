import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  children: React.ReactNode;
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  message = 'Loading...', 
  children,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10"
          role="alert"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="flex flex-col items-center space-y-3">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;