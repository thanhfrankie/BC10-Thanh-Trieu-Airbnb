import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { NavLink } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import "./Header.scss";
import ButtonCustom from "../../components/Button/ButtonCustom";
import InputCustom from "../../components/Input/InputCustom";
const items = [
  {
    label: <NavLink to="sign-up">Sign up</NavLink>,
    key: "0",
  },
  {
    label: <NavLink to="/sign-in">Log in</NavLink>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <NavLink to="/host/homes">Airbnb your home</NavLink>,
    key: "3",
  },
  {
    label: <NavLink to="/help">Help center</NavLink>,
    key: "4",
  },
];
const Header = () => {
  const [activeButton, setActiveButton] = useState("Stays");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div className="header">
      <div className="flex items-center mt-2">
        <nav className="w-full bg-white  py-2.5 h-20 pt-4">
          <div className="w-full flex  justify-between items-center">
            <NavLink
              to="/"
              className="logo text-sm flex items-center  font-bold"
            >
              <img src={logo} className="mr-3 h-6 sm:h-9" alt="Airbnb Logo" />
            </NavLink>

            <div className="flex items-center justify-between gap-2 ml-56 ">
              <ButtonCustom
                value="Stays"
                classNameBtn={activeButton === "Stays" ? "active" : ""}
                onClick={() => handleButtonClick("Stays")}
              ></ButtonCustom>
              <ButtonCustom
                value="Experiences"
                classNameBtn={activeButton === "Experiences" ? "active" : ""}
                onClick={() => handleButtonClick("Experiences")}
              ></ButtonCustom>
              <NavLink to="/s/experiences/online">
                <ButtonCustom value="Online Experiences"></ButtonCustom>
              </NavLink>
            </div>
            <div className="flex items-center justify-between ">
              <NavLink to="/host/homes">
                <ButtonCustom value="Airbnb your home"></ButtonCustom>
              </NavLink>
              <div className="mr-3">
                <button className="globe flex items-center justify-center text-center rounded-full w-9 h-9">
                  <i class="fa-regular fa-globe"></i>
                </button>
              </div>
              <div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  placement="topRight"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <button className="flex items-center justify-center space-x-3 py-2 px-3 rounded-full border border-gray-400 ">
                        <div className="flex items-center justify-center text-sm text-black">
                          <i class="fa-regular fa-bars"></i>
                        </div>
                        <div className="flex items-center justify-center text-2xl text-gray-500">
                          <i class="fa-solid fa-circle-user"></i>
                        </div>
                      </button>
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <div>
            <InputCustom
              placeholder="Search destinations"
              id="where"
              label="Where"
            />
          </div>
        </div>
        <div>
          {activeButton === "Stays" ? (
            <div className="flex items-center justify-center">
              <ButtonCustom value="Check in" span="Add Dates" />
              <ButtonCustom value="Check out" span="Add Dates" />
            </div>
          ) : (
            <ButtonCustom value="Date" span="Add Dates" />
          )}
        </div>
        <div>
          <ButtonCustom value="Who" span="Add guests" />
          <button>
            <i class="fa-regular fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
