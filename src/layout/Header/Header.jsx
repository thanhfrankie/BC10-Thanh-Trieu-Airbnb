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
    label: <NavLink to="/host/homes">Cho thuê chỗ ở qua Airbnb</NavLink>,
    key: "3",
  },
  {
    label: <NavLink to="/help">Trung tâm trợ giúp</NavLink>,
    key: "4",
  },
];
const Header = () => {
  const [activeButton, setActiveButton] = useState("Chỗ ở");
  const [isFocused, setIsFocused] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="header">
      <div className="flex items-center mt-1">
        <nav className="w-full bg-white  py-2.5 h-20 pt-4">
          <div className="w-full flex  justify-between items-center">
            <NavLink
              to="/"
              className="logo text-sm flex items-center  font-bold"
            >
              <img src={logo} className="mr-3 h-6 sm:h-9" alt="Airbnb Logo" />
            </NavLink>

            <div className="flex items-center justify-between gap-1 ml-56 ">
              <ButtonCustom
                value="Chỗ ở"
                classNameBtn={`btnHover  ${
                  activeButton === "Chỗ ở" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Chỗ ở")}
              />
              <ButtonCustom
                value="Trải nghiệm"
                classNameBtn={`btnHover  ${
                  activeButton === "Trải nghiệm" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Trải nghiệm")}
              />
              <NavLink to="/s/experiences/online">
                <ButtonCustom
                  value="Trải nghiệm trực tuyến"
                  classNameBtn="btnHover"
                />
              </NavLink>
            </div>
            <div className="flex items-center justify-between ">
              <NavLink to="/host/homes">
                <ButtonCustom
                  value="Cho thuê chỗ ở qua Airbnb"
                  classNameBtn="btnRent font-semibold text-black"
                />
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
                      <button className="flex items-center justify-center space-x-3 gap-1 py-2 px-3.5 rounded-full border border-gray-300 ">
                        <div className="flex items-center justify-center text-sm text-black">
                          <i class="fa-regular fa-bars"></i>
                        </div>
                        <div className="flex items-center justify-center text-3xl text-gray-500">
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
      <div
        className="h-auto w-1/2  flex items-center justify-center mx-auto gap-1 rounded-full border border-gray-500 "
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      >
        <div className="search w-1/3  px-6 rounded-full ">
          <button className="w-full py-2 text-start ">
            <InputCustom
              placeholder="Tìm kiếm điểm đến"
              id="Địa điểm"
              label="Địa điểm"
              className=" border-none px-4 outline-none "
              classNameLabel="font-bold"
            />
          </button>
        </div>

        <div className="w-1/3 rounded-full">
          {activeButton === "Chỗ ở" ? (
            <div className="flex items-center justify-center">
              <ButtonCustom
                value="Nhận phòng"
                span="Thêm ngày"
                classNameBtn="btnSearch text-xs w-1/2 px-6 text-start font-bold"
              />
              <ButtonCustom
                value="Trả phòng"
                span="Thêm ngày"
                classNameBtn="btnSearch text-xs w-1/2 px-6 text-start font-bold"
              />
            </div>
          ) : (
            <div className=" flex items-center justify-start mx-auto ">
              <ButtonCustom
                value="Ngày"
                span="Thêm ngày"
                classNameBtn="btnSearch text-xs w-full px-6 text-start font-bold"
              />
            </div>
          )}
        </div>
        <div className="w-1/3 flex items-center justify-center rounded-full relative">
          <ButtonCustom
            value="Khách"
            span="Thêm khách"
            classNameBtn="btnSearch text-xs w-full px-6 text-start font-bold"
          />
          <button>
            {isFocused ? (
              <div className="mag-glass px-4 py-3 flex items-center justify-center gap-2.5 absolute -right-12 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white ">
                <i class="fa-regular fa-magnifying-glass"></i>
                <span>Tìm kiếm</span>
              </div>
            ) : (
              <div className="mag-glass px-4 py-4 flex items-center justify-center absolute -right-4 top-1/2 transition transform -translate-x-1/2 -translate-y-1/2 text-white ">
                <i class="fa-regular fa-magnifying-glass"></i>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
