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

export const DEV_MOCK_USER: User = {
  id: 'dev-user-alex',
  name: 'Alex Rivera',
  email: 'alex.rivera@traveltoheaven.com',
  role: 'ADMIN',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  bio: 'Passionate globetrotter, alpine photographer, and cultural explorer. 34 countries visited.',
  location: 'Zurich, Switzerland',
  travelInterests: ['Mountain Trekking', 'Cultural Heritage', 'Coastal Sailing', 'Eco-Lodges'],
  followersCount: 1420,
  followingCount: 388,
  storiesCount: 18,
  photosCount: 64,
  tripsCount: 7,
  createdAt: '2023-01-15T10:00:00Z',
  enabled: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('t2h_user');
    if (stored) {
      try { return JSON.parse(stored); } catch { /* ignore */ }
    }
    // Default development authenticated user
    return DEV_MOCK_USER;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('t2h_auth_token') || 'dev-mock-jwt-token';
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Restore authenticated session on initial mount if stored
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('t2h_auth_token');
      const storedUser = localStorage.getItem('t2h_user');
      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch {
          setUser(DEV_MOCK_USER);
          setToken('dev-mock-jwt-token');
        }
      } else {
        // Dev fallback
        setUser(DEV_MOCK_USER);
        setToken('dev-mock-jwt-token');
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
