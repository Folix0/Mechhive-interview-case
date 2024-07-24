import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  //Initial authentication check on component mount
  useEffect(() => {
    setIsMounted(true);
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  //If the component is mounted, the auth status is saved to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }
  }, [isAuthenticated, isMounted]);

  const login = ({ username, password }: { username: string; password: string }) => {
    //Placeholder authentication logic
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};