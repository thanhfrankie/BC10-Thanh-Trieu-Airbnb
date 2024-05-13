import { http } from "./config";
import { getToken } from "../services/authService"; // Import hàm lấy token

export const userManagementServ = {
    signUp: (data) => {
        return http.post("/auth/signup", data);
    },
    signIn: (data) => {
        return http.post("/auth/signin", data);
    }
};

export const getViTriById = async (vitriId) => {
    try {
        const token = getToken(); // Lấy token từ localStorage
        const response = await http.get(`/vi-tri/${vitriId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề Authorization
            },
        });
        return response.data.content; // Trả về dữ liệu của người dùng
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await http.get(`/users/${userId}`);
        return response.data.content; // Trả về dữ liệu của người dùng
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
        return response.data; // Trả về dữ liệu người dùng sau khi cập nhật thành công
      } else {
        throw new Error("Error updating user data");
      }
    } catch (error) {
      throw error;
    }
  };



