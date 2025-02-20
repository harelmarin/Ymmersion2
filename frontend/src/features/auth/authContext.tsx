import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean | null;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Auth Check Response:', data);

      if (data.status === 'valid') {
        setUser({ id: data.id, email: data.email });
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Error during auth check:', error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  const login = async (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    await checkAuth();
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        checkAuth,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
