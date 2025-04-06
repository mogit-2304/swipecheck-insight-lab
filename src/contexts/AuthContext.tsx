
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  department: string;
  isAnonymous: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string, department: string) => void;
  logout: () => void;
  toggleAnonymous: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, name: string, department: string) => {
    setUser({
      email,
      name,
      department,
      isAnonymous: false,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleAnonymous = () => {
    if (user) {
      setUser({
        ...user,
        isAnonymous: !user.isAnonymous,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        toggleAnonymous,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
