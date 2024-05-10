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

export const getUserById = async (userId) => {
    try {
        const token = getToken(); // Lấy token từ localStorage
        const response = await http.get(`/users/${userId}`, {
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


