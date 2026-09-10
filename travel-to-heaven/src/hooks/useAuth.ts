import { useAuthContext } from '@/context/AuthContext';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout, updateUser } = useAuthContext();
  
  const isAdmin = user?.role === 'ADMIN';

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isAdmin,
    login,
    logout,
    updateUser,
  };
}
