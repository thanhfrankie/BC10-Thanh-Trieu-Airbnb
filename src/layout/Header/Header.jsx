import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Space } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import "./Header.scss";
import ButtonCustom from "../../components/Button/ButtonCustom";
import { getLocalStorage, renderAvatar } from "../../utils/util";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { locationManagement } from "../../services/locationManagement";
import { convertToSlug } from "../../utils/util";
import PopupLocation from "../../components/PopupLocation/PopupLocation";

const Header = () => {
  const navigate = useNavigate();
  const notify = useContext(NotifyContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userLocal, setUserLocal] = useState(null);
  
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationManagement.getLocation();
        setLocations(response.data.content.slice(0, 10));
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    if (selectedLocation) {
      navigate(`/rooms/${convertToSlug(selectedLocation)}`);
    } else {
      alert("Vui lòng chọn một điểm đến để tìm kiếm!");
    }
  };


  useEffect(() => {
    const userLocal = getLocalStorage("user");
    if (userLocal) {
      setUserLocal(userLocal);
      setIsLoggedIn(true); 
    }
    const checkLocalStorage = () => {
      return userLocal !== null;
    };

    setIsLoggedIn(checkLocalStorage());
    setUserRole(userLocal?.user.role);
  }, []);

  const handleLogout = () => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserRole(null);
      if (window.location.pathname === "/") {
        notify("Đăng xuất thành công");
      } else {
        notify("Đăng xuất thành công, đang quay về trang chủ");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  };
  const isAdmin = isLoggedIn && userRole === "ADMIN";

  const items = isLoggedIn
    ? [
        {
          label: `Xin chào : ${userLocal.user.name}`,
          key: "greeting",
          className: "greeting-style",
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
          key: "1",
        },
        {
          label: <NavLink to="/trips">Chuyến đi</NavLink>,
          key: "2",
        },
        {
          label: <NavLink to="/host/homes">Cho thuê chỗ ở qua Airbnb</NavLink>,
          key: "3",
        },
        {
          label: <NavLink to="/help">Trung tâm trợ giúp</NavLink>,
          key: "4",
        },
        {
          label: "Đăng xuất",
          onClick: () => handleLogout(),
          key: "logout",
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
          label: (
            <NavLink to="https://www.airbnb.com.vn/host/homes">
              Cho thuê chỗ ở qua Airbnb
            </NavLink>
          ),
          key: "3",
        },
        {
          label: (
            <NavLink to="https://www.airbnb.com.vn/help">
              Trung tâm trợ giúp
            </NavLink>
          ),
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
      <div className="flex items-center  mt-1">
        <div style={{ top:"1%",left:"50%",transform:"translate(-50%, -50%)",position:"fixed"}} className="w-full bg-white container py-2.5 h-36 pt-8 absolute z-99999">
          <div className="w-full flex pt-12 justify-between items-center">
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
              <NavLink to="https://www.airbnb.com.vn/s/experiences/online">
                <ButtonCustom
                  value="Trải nghiệm trực tuyến"
                  classNameBtn="btnHover"
                />
              </NavLink>
            </div>
            <div className="flex items-center justify-between ">
              <NavLink to="https://www.airbnb.com.vn/host/homes">
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
                  <button onClick={(e) => e.preventDefault()}>
                    <Space>
                      <button className="flex items-center justify-center space-x-3 gap-1 py-2 px-3.5 rounded-full border border-gray-300 ">
                        <div className="flex items-center justify-center text-sm text-black">
                          <i className="fa-regular fa-bars"></i>
                        </div>
                        <div className="flex items-center justify-center text-3xl text-gray-500">
                          {isLoggedIn ? (
                            userLocal && renderAvatar(userLocal.user)
                          ) : (
                            <i className="fa-solid fa-circle-user"></i>
                          )}
                        </div>
                      </button>
                    </Space>
                  </button>
                </Dropdown>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div style={{marginTop:"80px"}}
        className="h-auto w-1/2  flex items-center justify-center mx-auto gap-1 rounded-full border border-gray-500 "
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      >
        <div className="search w-1/3  px-6 rounded-full ">
          <button className="w-full py-2 text-start ">
          <button style={{fontWeight:"bold"}} onClick={() => setShowPopup(true)}>
        {selectedLocation ? selectedLocation : "Tìm kiếm điểm đến"}
      </button>
      {showPopup && (
        <PopupLocation
          locations={locations}
          onSelectLocation={(location) => setSelectedLocation(location)}
          onClose={() => setShowPopup(false)}
        />
      )}
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
          <button onClick={handleSearch}>
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






