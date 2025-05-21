import api from "./api.service";

// Met à jour les informations de l'utilisateur
const updateUser = async (data: any) => {
  const response = await api.put("/auth/me", data);
  return response.data;
};

// Récupère les infos utilisateur avec un token
const getUserWithToken = async (token: string) => {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Récupère les réservations de l'utilisateur connecté
const getUserReservations = async (token: string) => {
  const response = await api.get("/users/me/reservations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const UserService = {
  getUserWithToken,
  updateUser,
  getUserReservations,
};

export default UserService;
