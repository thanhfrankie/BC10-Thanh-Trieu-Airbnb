import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { NavLink } from "react-router-dom";
import "./Header.scss";
const items = [
  {
    label: <NavLink to="sign-up">Đăng ký</NavLink>,
    key: "0",
  },
  {
    label: <NavLink to="/sign-in">Đăng nhập</NavLink>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const Header = () => {
  return (
    <div className="header mt-5">
      Header
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        placement="topRight"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space >
            <button className="flex items-center justify-center space-x-4 py-2 px-4 rounded-full border border-gray-400 ">
              <div className="flex items-center justify-center text-lg">
                <i class="fa-regular fa-bars"></i>
              </div>
              <div className="flex items-center justify-center text-2xl text-gray-400">
                <i class="fa-solid fa-circle-user"></i>
              </div>
            </button>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Header;
