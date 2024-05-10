import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../services/api'; 
import Cookies from 'js-cookie';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인
  const login = async (email, password) => {
      try {
          await loginUser({ email, password });
          setIsAuthenticated(true);
      } catch (error) {
          console.error('Login error:', error);
      }
  };

  // 로그아웃
  const logout = async () => {
      try {
          await logoutUser();
          setIsAuthenticated(false);
      } catch (error) {
          console.error('Logout error:', error);
      }
  };

  // 페이지 로드 시 토큰 확인
  useEffect(() => {
    const token = Cookies.get('Authorization');
      if (token) {
          setIsAuthenticated(true);
      }
  }, []);

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
          {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);