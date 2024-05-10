import { http } from "./config";
export const roomManagement = {
  getAllRoom: (data) => {
    return http.get("/phong-thue", data);
  },
  getRoomByLocation: (data) => {
    return http.get("/phong-thue/lay-phong-theo-vi-tri", data);
  },
  getRoomWithPagination: (data) => {
    return http.get("/phong-thue/phan-trang-tim-kiem", data);
  },
};
