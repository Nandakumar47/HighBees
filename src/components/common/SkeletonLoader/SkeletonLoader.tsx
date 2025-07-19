import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  height?: string;
  width?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  count = 1, 
  height = 'h-4', 
  width = 'w-full' 
}) => {
  return (
    <div className={className} role="status" aria-label="Loading content">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${height} ${width} bg-gray-200 rounded animate-pulse ${
            index < count - 1 ? 'mb-2' : ''
          }`}
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse" role="status" aria-label="Loading card">
    <div className="h-48 bg-gray-200 rounded-lg mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <tr className="animate-pulse" role="status" aria-label="Loading table row">
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-32" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-24" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-20" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-16" />
    </td>
  </tr>
);

export default SkeletonLoader;