import { http } from "./config";
export const roomManagement = {
  getAllRoom: () => {
    return http.get("/phong-thue");
  },
  getRoomByLocation: (location) => {
    return http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${location}`);
  },

  // getRoomWithPagination: (data) => {
  //   return http.get("/phong-thue/phan-trang-tim-kiem", data);
  // },
};
