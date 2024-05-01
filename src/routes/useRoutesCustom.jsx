import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ThongTinCaNhan from "../pages/ThongTinCaNhan/ThongTinCaNhan";
import TaoHoSo from "../pages/ThongTinCaNhan/TaoHoSo/TaoHoSo";
import XacMinhDanhTinh from "../pages/ThongTinCaNhan/XacMinhDanhTinh/XacMinhDanhTinh";

const useRoutesCustom = () => {
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
          path: "xac-minh",
          element: <XacMinhDanhTinh />,
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
