import api from "./api.service";

const updateUser = async (data: any) => {
  const response = await api.put("/auth/me", data);
  return response.data;
};

const getUserWithToken = async (token: string) => {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const UserService = {
  getUserWithToken,
  updateUser,
};

export default UserService;
