import { http } from "./config";
import { getLocalStorage } from "../utils/util";
export const QuanLyUser = {

getAllUser:()=>{
    return http.get(
        "/users"
    )
}


}