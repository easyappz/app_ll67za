import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { message } from 'antd';

const AuthContext = createContext({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize access with fallback to 'token'
  const initialAccess = localStorage.getItem('accessToken') || localStorage.getItem('token');
  const [accessToken, setAccessToken] = useState(initialAccess);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  // Optional sync: if only 'token' exists, copy it into 'accessToken'
  useEffect(() => {
    const hasAccess = localStorage.getItem('accessToken');
    const token = localStorage.getItem('token');
    if (!hasAccess && token) {
      localStorage.setItem('accessToken', token);
    }
  }, []);

  const isAuthenticated = Boolean(accessToken);

  const login = useCallback((data) => {
    // data: { access, refresh, user }
    if (data?.access) {
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('token', data.access);
      setAccessToken(data.access);
    }
    if (data?.refresh) {
      localStorage.setItem('refreshToken', data.refresh);
      setRefreshToken(data.refresh);
    }
    if (data?.user) {
      setUser(data.user);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
    } catch (e) {
      // ignore
    }
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    message.info('Вы вышли из аккаунта');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }, []);

  const value = useMemo(() => ({
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    setUser,
  }), [user, accessToken, refreshToken, isAuthenticated, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
