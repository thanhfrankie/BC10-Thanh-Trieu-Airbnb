import axios from "axios";
import { getLocalStorage } from "../utils/util";

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    tokenCyberSoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMCIsIkhldEhhblN0cmluZyI6IjMwLzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MTc1NzIwMDAwMCIsIm5iZiI6MTY5ODY4NTIwMCwiZXhwIjoxNzYxNzU3MjAwfQ.R238KQt9e-rThXuVLj1cb3kh1KFNdm3eTIiaP4z3IQQ",
    token: `${getLocalStorage("user")?.token}`,
  },
  timeout: "10000",
});