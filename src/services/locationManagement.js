import { http } from "./config";
export const locationManagement = {
    getLocation: () => {
        return http.get("/vi-tri");
      },
}