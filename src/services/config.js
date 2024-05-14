import axios from "axios";
import { getLocalStorage } from "../utils/util";

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    tokenCyberSoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDEiLCJIZXRIYW5TdHJpbmciOiIxNy8xMC8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MjkxMjMyMDAwMDAiLCJuYmYiOjE3MTE2NDUyMDAsImV4cCI6MTcyOTI3MDgwMH0.eZHFmA2-LPiTU4hhprKRbSSPHBM77j9yic31O97Z0rc",
    token: `${getLocalStorage("user")?.token}`,
  },
  timeout: "10000",
});


