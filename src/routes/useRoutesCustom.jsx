import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
