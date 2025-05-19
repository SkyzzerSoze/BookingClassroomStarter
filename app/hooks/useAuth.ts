import { useContext } from "react";
import AuthService from "../services/auth.service";
import AuthContext from "../context/AuthContext";
import { removeToken, saveToken } from "../utils/token-jwt";

const useAuth = () => {
  const { user, setUser, loading } = useContext(AuthContext);

  const signin = async (credentials: any) => {
    try {
      const response = await AuthService.signin(credentials);
      setUser(response.user);
      saveToken(response.token);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (data: any) => {
    try {
      const response = await AuthService.register(data);
      setUser(response.user);
      saveToken(response.token);
    } catch (error) {
      console.error("Erreur d'inscription :", error);
    }
  };

  const signout = async () => {
    setUser(null);
    removeToken();
  };

  return { user, setUser, loading, signin, signout, register };
};

export default useAuth;
