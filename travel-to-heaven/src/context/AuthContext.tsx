import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@/types/user.types';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('t2h_auth_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore authenticated session on initial mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('t2h_auth_token');
      if (storedToken) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          setToken(storedToken);
        } catch (error) {
          console.warn('Session restoration failed:', error);
          localStorage.removeItem('t2h_auth_token');
          localStorage.removeItem('t2h_user');
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback((newToken: string, newUser: User) => {
    localStorage.setItem('t2h_auth_token', newToken);
    localStorage.setItem('t2h_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('t2h_auth_token');
    localStorage.removeItem('t2h_user');
    setToken(null);
    setUser(null);
    authService.logout().catch(() => {});
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('t2h_user', JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
