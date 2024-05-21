import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../../../utils/util";
import { NavLink } from "react-router-dom";
const BottomNav = ({ activeBottomButton, handleClick }) => {
  const [userLocal, setUserLocal] = useState(null);

  useEffect(() => {
    const userLocal = getLocalStorage("user");
    if (userLocal) {
      setUserLocal(userLocal);
    }
  }, []);
  return (
    <div className="bottom-nav_container w-full py-3 fixed bottom-0 left-0 z-20 bg-white px-16">
      {userLocal ? (
        <div className="flex items-center justify-between">
          <NavLink
            to="/rooms"
            className={`flex items-center justify-center flex-col ${
              activeBottomButton === "Khám phá" ? "text-red-500" : ""
            }`}
            onClick={() => handleClick("Khám phá")}
          >
            <div className="text-xl">
              <i class="fa-sharp fa-light fa-magnifying-glass"></i>
            </div>
            <div className="text-xs">Khám phá</div>
          </NavLink>
          <button
            className={`flex items-center justify-center flex-col ${
              activeBottomButton === "Yêu thích" ? "text-red-500" : ""
            }`}
            onClick={() => handleClick("Yêu thích")}
          >
            <div>
              <i class="fa-light fa-heart"></i>
            </div>
            <div>Yêu thích</div>
          </button>
          <NavLink
            to="/trips"
            className={`flex items-center justify-center flex-col ${
              activeBottomButton === "Chuyến đi" ? "text-red-500" : ""
            }`}
            onClick={() => handleClick("Chuyến đi")}
          >
            <div>
              <i class="fa-brands fa-airbnb"></i>
            </div>
            <div>Chuyến đi</div>
          </NavLink>
          <button
            className={`flex items-center justify-center flex-col ${
              activeBottomButton === "Tin nhắn" ? "text-red-500" : ""
            }`}
            onClick={() => handleClick("Tin nhắn")}
          >
            <div>
              <i class="fa-regular fa-message-middle"></i>
            </div>
            <div>Tin nhắn</div>
          </button>
          <NavLink
            to="/thong-tin-ca-nhan"
            className="flex items-center justify-center flex-col"
            onClick={() => handleClick("Hồ sơ")}
          >
            <div>
              <i class="fa-light fa-circle-user"></i>
            </div>
            <div>Hồ sơ</div>
          </NavLink>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <NavLink
            to="/rooms"
            className={`flex items-center justify-center flex-col ${
              activeBottomButton === "Khám phá" ? "text-red-500" : ""
            }`}
            onClick={() => handleClick("Khám phá")}
          >
            <div>
              <i class="fa-sharp fa-light fa-magnifying-glass"></i>
            </div>
            <div>Khám phá</div>
          </NavLink>
          <button
            className={`flex items-center justify-center flex-col ${
              activeBottomButton === "Yêu thích" ? "text-red-500" : ""
            }`}
            onClick={() => handleClick("Yêu thích")}
          >
            <div>
              <i class="fa-light fa-heart"></i>
            </div>
            <div>Yêu thích</div>
          </button>
          <NavLink
            to="/sign-in"
            className="flex items-center justify-center flex-col"
            onClick={() => handleClick("Đăng nhập")}
          >
            <div>
              <i class="fa-light fa-circle-user"></i>
            </div>
            <div>Đăng nhập</div>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default BottomNav;
