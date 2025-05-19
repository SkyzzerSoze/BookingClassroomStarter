import api from "./api.service";

const ENDPOINT = "/auth/signin";
const REGISTER_ENDPOINT = "/auth/register";

const signin = async (credentials: any) => {
  const response = await api.post(ENDPOINT, credentials);

  return response.data;
};

const register = async (data: any) => {
  const response = await api.post(REGISTER_ENDPOINT, data);
  return response.data;
};

const AuthService = {
  signin,
  register,
};

export default AuthService;
