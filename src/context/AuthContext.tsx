import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'generator' | 'collector' | 'company';
}

// Define context type
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, role: 'generator' | 'collector' | 'company') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate a successful login
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mock user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      username,
      email: `${username}@example.com`,
      role: 'generator', // Default role
    };
    
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  };

  // Register function
  const register = async (email: string, username: string, password: string, role: 'generator' | 'collector' | 'company') => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      username,
      email,
      role,
    };
    
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};