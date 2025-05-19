import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, removeToken } from "../utils/token-jwt";
import UserService from "../services/user.service";

interface User {
  id: string;
  email: string;
  
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  signout: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const initializeAuth = async () => {
    setLoading(true);
    const token = await getToken();
    if (token) {
      try {
        const user = await UserService.getUserWithToken(token);
        setUser(user);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        setUser(null);
        await removeToken();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const signout = async () => {
    setUser(null);
    await removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
