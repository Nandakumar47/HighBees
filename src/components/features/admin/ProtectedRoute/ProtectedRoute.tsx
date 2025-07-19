import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { ROUTES } from '../../../../utils/constants';
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to={ROUTES.ADMIN.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;