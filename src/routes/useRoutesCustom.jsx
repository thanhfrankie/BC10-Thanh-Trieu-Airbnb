import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

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
    
      ],
    },
    {
      path: "/admin",
      element: <AdminTemplate />,
      children: [
        {
          path: "/admin/quan-li-phim",
          // element: <MovieManager />,
        },
        
      ],
    },
  ]);
  return routes;
};

export default useRoutesCustom;
