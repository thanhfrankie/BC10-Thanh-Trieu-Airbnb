import React, { useState, useEffect,useContext } from "react";
import { Dropdown, Space } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import "./Header.scss";
import ButtonCustom from "../../components/Button/ButtonCustom";
import InputSearchBar from "../../components/Input/InputSearchBar";
import { getLocalStorage } from "../../utils/util";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";

const Header = () => {

  const navigate = useNavigate();
  const notify = useContext(NotifyContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userLocal, setUserLocal] = useState(null);

  useEffect(() => {
    const userLocal = getLocalStorage("user");
    setUserLocal(userLocal);
    const checkLocalStorage = () => {
      return userLocal !== null;
    };
    // Kiểm tra và cập nhật trạng thái đăng nhập khi component được mount
    setIsLoggedIn(checkLocalStorage());
    setUserRole(userLocal?.user.role); // Lấy vai trò của người dùng từ localStorage
    console.log("User role:", userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null); // Reset vai trò của người dùng khi đăng xuất
    notify("Đăng xuất thành công , đang quay về trang chủ");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  

  const isAdmin = isLoggedIn && userRole === "ADMIN";

  const items = isLoggedIn
    ? [
        {
          label: `Xin chào : ${userLocal.user.name}`,
          key: "greeting",
          className: "greeting-style"
        },
        {
          label: "Đăng xuất",
          onClick: handleLogout,
          key: "logout",
        },
        ...(isAdmin
          ? [
              {
                label: <NavLink to="/admin">Admin</NavLink>,
                key: "admin",
              },
            ]
          : []),
        {
          type: "divider",
        },
        {
          label: <NavLink to="/thong-tin-ca-nhan">Thông tin cá nhân</NavLink>,
          key: "6",
        },
        {
          label: (
            <NavLink to="/host/homes">Cho thuê chỗ ở qua Airbnb</NavLink>
          ),
          key: "3",
        },
        {
          label: <NavLink to="/help">Trung tâm trợ giúp</NavLink>,
          key: "4",
        },
      ]
    : [
        {
          label: <NavLink to="/sign-up">Đăng ký</NavLink>,
          key: "signup",
        },
        {
          label: <NavLink to="/sign-in">Đăng nhập</NavLink>,
          key: "signin",
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
                  <i className="fa-regular fa-globe"></i>
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
                          <i className="fa-regular fa-bars"></i>
                        </div>
                        <div className="flex items-center justify-center text-3xl text-gray-500">
                          <i className="fa-solid fa-circle-user"></i>
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
            <InputSearchBar
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
                classNameBtn="btnSearch text-xs w-1/2 py-2 px-6 text-start font-bold"
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
                <i className="fa-regular fa-magnifying-glass"></i>
                <span>Tìm kiếm</span>
              </div>
            ) : (
              <div className="mag-glass px-4 py-4 flex items-center justify-center absolute -right-4 top-1/2 transition transform -translate-x-1/2 -translate-y-1/2 text-white ">
                <i className="fa-regular fa-magnifying-glass"></i>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
