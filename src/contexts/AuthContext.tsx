import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Demo credentials - In production, this should be handled by a secure backend
  const DEMO_CREDENTIALS = {
    username: 'admin',
    password: 'highbees2024'
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = Cookies.get('admin_token');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      setIsAuthenticated(true);
      // Set secure cookie that expires in 24 hours
      Cookies.set('admin_token', 'authenticated', { 
        expires: 1, 
        secure: true, 
        sameSite: 'strict' 
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('admin_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};