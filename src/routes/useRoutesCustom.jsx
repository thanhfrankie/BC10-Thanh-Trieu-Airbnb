import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ThongTinCaNhan from "../pages/ThongTinCaNhan/ThongTinCaNhan";
import TaoHoSo from "../pages/ThongTinCaNhan/TaoHoSo/TaoHoSo";
import XacMinhDanhTinh from "../pages/ThongTinCaNhan/XacMinhDanhTinh/XacMinhDanhTinh";
import RoomDetail from "../pages/RoomDetail/RoomDetail";
import RoomLocation from "../pages/RoomLocation/RoomLocation";
import Rooms from "../pages/Rooms/Rooms";
import Trips from "../pages/Trips/Trips";
import { getLocalStorage } from "../utils/util";

const useRoutesCustom = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userLocal = getLocalStorage("user");
    if (window.location.pathname === "/room-detail") {
      navigate("/room-detail/1");
    }
    if (userLocal && window.location.pathname === "/sign-in") {
      navigate("/");
    }
  }, [navigate]);
  const routes = useRoutes([
    {
      path: "/",
      element: <UserTemplate />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
        {
          path: "thong-tin-ca-nhan",
          element: <ThongTinCaNhan />,
        },
        {
          path: "tao-ho-so",
          element: <TaoHoSo />,
        },
        {
          path: "room-detail/:roomId",
          element: <RoomDetail />,
        },
        {
          path: "rooms",
          element: <Rooms />,
        },
        {
          path: "rooms/:locationId",
          element: <RoomLocation />,
        },
        {
          path: "trips",
          element: <Trips />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminTemplate />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
