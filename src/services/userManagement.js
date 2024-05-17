import { http } from "./config";
import { getToken } from "../services/authService";

export const userManagementServ = {
    signUp: (data) => {
        return http.post("/auth/signup", data);
    },
    signIn: (data) => {
        return http.post("/auth/signin", data);
    }
};


export const getUserById = async (userId) => {
    try {
        const response = await http.get(`/users/${userId}`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

// Hàm gửi yêu cầu cập nhật thông tin người dùng lên API
export const updateUserById = async (userId, updatedUserData) => {
    try {
      const response = await http.put(`/users/${userId}`, updatedUserData);
      if (response.status === 200) {
        return response.data; 
      } else {
        throw new Error("Error updating user data");
      }
    } catch (error) {
      throw error;
    }
  };



