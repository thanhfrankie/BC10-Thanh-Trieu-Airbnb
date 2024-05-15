import { http } from "./config";
export const commentManagement = {
  getRoomComment: (room) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-phong/${room}`);
  },
  postComment: (data) => {
    return http.post("/binh-luan", data);
  },
};
