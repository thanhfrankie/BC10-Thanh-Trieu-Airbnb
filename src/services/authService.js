import { getLocalStorage } from "../utils/util";

export const getToken = () => {
  const userData = getLocalStorage("user");

  if (userData != null) {
    if (typeof userData === 'object' && 'token' in userData) {
        // console.log("Token trong userData là :",userData.token);
        return userData.token;
    } else {     
        // console.log("Không có  token trong userData.");
        return null;
    }
  } else {
    // console.log("Không có dữ liệu người dùng.");
    return null;
  }
};


