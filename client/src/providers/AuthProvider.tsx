import { jwtDecode } from 'jwt-decode';
import { type ReactNode, useEffect, useState } from 'react';
import { AuthContext, type User } from '../contexts/AuthContext';
import api from '../services/apiService';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedUser: User = jwtDecode(token);
        setUser(decodedUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      if (!token) throw new Error('Token de login não fornecido');

      const decodedUser: User = jwtDecode(token);
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(decodedUser);
    } catch (error) {
      console.error('Falha ao processar o token de login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
