import { useState, useCallback, createContext, useContext, ReactNode, useEffect } from 'react';
import React from 'react';
import { authService } from '../services/authService';
import { User, RegisterData, LoginData } from '../types/auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  login: (data: LoginData) => void;
  register: (data: RegisterData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  const login = useCallback((data: LoginData) => {
    const loggedUser = authService.login(data);
    setUser(loggedUser);
  }, []);

  const register = useCallback((data: RegisterData) => {
    const newUser = authService.register(data);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return React.createElement(
    AuthContext.Provider,
    { value: { isAuthenticated: user !== null, user, login, register, logout } },
    children
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
