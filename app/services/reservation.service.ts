import api from "./api.service";

const createReservation = async (data: {
  classroomId: string;
  start: string;
  end: string;
}) => {
  const response = await api.post("/reservations", data);
  return response.data;
};

const ReservationService = {
  createReservation,
};

export default ReservationService;
