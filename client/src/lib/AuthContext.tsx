import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '@/lib/queryClient';
import type { User } from '@shared/schema';

type SafeUser = Omit<User, 'password'>;

interface AuthContextType {
  user: SafeUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<SafeUser>;
  logout: () => Promise<void>;
  register: (username: string, password: string, email?: string, fullName?: string) => Promise<SafeUser>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<SafeUser> => {
    const response = await apiRequest('POST', '/api/auth/login', { username, password });
    const data = await response.json();
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await apiRequest('POST', '/api/auth/logout');
    setUser(null);
  };

  const register = async (username: string, password: string, email?: string, fullName?: string): Promise<SafeUser> => {
    const response = await apiRequest('POST', '/api/auth/register', { username, password, email, fullName });
    const data = await response.json();
    return data.user;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useRequireAuth(requiredRole?: string) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return { user: null, isLoading: true, hasAccess: false };
  }
  
  if (!user) {
    return { user: null, isLoading: false, hasAccess: false };
  }
  
  if (requiredRole) {
    const hasAccess = user.role === 'super_admin' || user.role === 'admin' || (requiredRole === 'staff' && user.role === 'staff');
    return { user, isLoading: false, hasAccess };
  }
  
  return { user, isLoading: false, hasAccess: true };
}
