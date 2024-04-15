import { http } from "./config"

export const userManagementServ = {
    signUp: (data) => {
        return http.post("/auth/signup",data)
    },
    signIn: (data) => {
        return http.post("/auth/signin",data)
    }
}