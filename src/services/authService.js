// authService.js

import { getLocalStorage } from "../utils/util";


export const getToken = () => {
  const userData = getLocalStorage("user");

  if (userData != null) {
    // `userData` tồn tại, tiếp tục kiểm tra thuộc tính `token`
    if (typeof userData === 'object' && 'token' in userData) {
        // Thuộc tính `token` tồn tại trong `userData`
        // console.log("Token trong userData là :",userData.token);
        return userData.token;
    } else {
        // Thuộc tính `token` không tồn tại trong `userData`
        // console.log("Không có  token trong userData.");
        return null;
    }
  } else {
    // `userData` không tồn tại
    // console.log("Không có dữ liệu người dùng.");
    return null;
  }
};


