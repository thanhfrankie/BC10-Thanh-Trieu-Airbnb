import React from "react";
import { Outlet } from "react-router-dom";
const UserTemplate = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default UserTemplate;
