import { http } from "./config";
export const bookingManagement = {
  bookRoom: (data) => {
    return http.post("/dat-phong", data);
  },
  getBookedRoom: (userId) => {
    return http.get(`/dat-phong/lay-theo-nguoi-dung/${userId}`);
  },
  deleteBookedRoom:  (bookedRoomId) => {
    return http.delete(`/dat-phong/${bookedRoomId}`);
  },
};