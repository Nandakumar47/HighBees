import React from 'react';
import LoadingSpinner from './common/LoadingSpinner/LoadingSpinner';

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = 'Loading page...', 
  fullScreen = true 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white flex items-center justify-center z-50'
    : 'flex items-center justify-center py-20';

  return (
    <div 
      className={containerClasses}
      role="alert"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="xl" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
          <p className="text-gray-600">Please wait while we load the content</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;