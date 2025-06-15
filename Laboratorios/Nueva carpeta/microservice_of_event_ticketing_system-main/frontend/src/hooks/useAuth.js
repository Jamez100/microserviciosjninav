'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { authAPI } from '@/lib/api';

const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Datos parseados del token:', payload);
    return payload;
  } catch (error) {
    console.error('Error al parsear el token:', error);
    return null;
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token encontrado en localStorage:', token);
      const parsed = parseJwt(token);
      if (parsed) {
        setUser({ username: parsed.username || parsed.userName, role: parsed.role });
      } else {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token } = response.data;

      console.log('Token recibido del login:', token);
      localStorage.setItem('token', token);

      const parsed = parseJwt(token);
      setUser({ username: parsed.username || parsed.userName, role: parsed.role });

      return { success: true };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.response?.data?.message || 'Error de login' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Elimina esta línea si no tienes endpoint real
    // authAPI.logout().catch(() => { });
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
