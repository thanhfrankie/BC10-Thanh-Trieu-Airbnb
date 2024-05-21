import React, { useState, useEffect, useContext, useRef } from "react";
import { Dropdown, Space } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import logo_tablet from "./../../assets/img/logo-tablet.jpg";
import ButtonCustom from "../../components/Button/ButtonCustom";
import { getLocalStorage, renderAvatar } from "../../utils/util";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { locationManagement } from "../../services/locationManagement";
import { convertToSlug } from "../../utils/util";
import PopupLocation from "../../components/PopupLocation/PopupLocation";
import InputSearchBar from "../../components/Input/InputSearchBar";
import "./Header.scss";
import BottomNav from "./BottomNav/BottomNav";
import SearchBar from "./SearchBar/SearchBar";
import { DatePicker } from "antd";
import moment from "moment";
import Guest from "./Guest/Guest";
// import 'antd/dist/antd.css';
const Header = () => {
  const navigate = useNavigate();
  const notify = useContext(NotifyContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userLocal, setUserLocal] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeButton, setActiveButton] = useState("Chỗ ở");
  const [isFocused, setIsFocused] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [activeBottomButton, setActiveBottomButton] = useState("Khám phá");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
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

  const handleSearch = () => {
    if (searchInputValue) {
      navigate(`/rooms/${convertToSlug(searchInputValue)}`);
    } else {
      navigate(`/rooms`)
    }
  };
  const handleInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

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

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const handleBottomButtonClick = (buttonName) => {
    setActiveBottomButton(buttonName);
  };
  const handleStartClick = () => {
    setIsStartOpen(true);
  };

  const handleEndClick = () => {
    setIsEndOpen(true);
  };

  const handleStartDateChange = (date, dateString) => {
    setStartDate(date);
    setIsStartOpen(false);
    if (endDate && date && endDate.isBefore(date, "day")) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date, dateString) => {
    setEndDate(date);
    setIsEndOpen(false);
  };
  const disabledEndDate = (current) => {
    return current && startDate && current.isBefore(startDate, "day");
  };
  return (
    <header>
      <div className="header w-full h-48 py-4 flex items-center justify-center flex-col ">
        <div className="search-bar__mobile w-full px-6">
          <SearchBar />
        </div>
        <div className="header-bottom__nav">
          <BottomNav
            handleClick={handleBottomButtonClick}
            activeBottomButton={activeBottomButton}
          />
        </div>

        <div className="header-container w-full bg-white ">
          <div className="header-container__main w-full flex justify-between items-center ">
            <div className="header-logo__container w-1/3 ">
              <NavLink
                to="/"
                className="header-logo__icon  flex items-center justify-center "
              >
                <img
                  src={logo_tablet}
                  alt="Airbnb Logo"
                  className="logo-tablet h-auto  object-cover "
                />
              </NavLink>
              <NavLink
                to="/"
                className="header-logo text-sm flex items-center justify-center"
              >
                <img src={logo} className="w-full" alt="Airbnb Logo" />
              </NavLink>
            </div>
            <div className="header-center__container w-1/3 flex items-center justify-center ">
              <ButtonCustom
                value="Chỗ ở"
                classNameBtn={`btn-hover   ${
                  activeButton === "Chỗ ở" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Chỗ ở")}
              />
              <ButtonCustom
                value="Trải nghiệm"
                classNameBtn={`btn-hover  ${
                  activeButton === "Trải nghiệm" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Trải nghiệm")}
              />
              <NavLink to="https://www.airbnb.com.vn/s/experiences/online">
                <ButtonCustom
                  value="Trải nghiệm trực tuyến"
                  classNameBtn="btn-hover"
                />
              </NavLink>
            </div>
            <div className="header-right__container lg:ml-3 md:ml-2 w-1/3 flex items-center justify-end ">
              <NavLink to="https://www.airbnb.com.vn/host/homes">
                <ButtonCustom
                  value="Cho thuê chỗ ở qua Airbnb"
                  classNameBtn="btn-rent font-semibold text-black"
                />
              </NavLink>
              <div className="mr-3 md:mr-2">
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
        <div className="search-container h-36 w-full flex items-center justify-center ">
          <div className="search-main__container w-full flex items-center justify-center flex-col ">
            <div className="header-center__container2 flex items-center justify-center ">
              <ButtonCustom
                value="Chỗ ở"
                classNameBtn={`btn-hover   ${
                  activeButton === "Chỗ ở" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Chỗ ở")}
              />
              <ButtonCustom
                value="Trải nghiệm"
                classNameBtn={`btn-hover  ${
                  activeButton === "Trải nghiệm" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Trải nghiệm")}
              />
              <NavLink to="https://www.airbnb.com.vn/s/experiences/online">
                <ButtonCustom
                  value="Trải nghiệm trực tuyến"
                  classNameBtn="btn-hover"
                />
              </NavLink>
            </div>

            <div
              tabindex="-1"
              className="search-bar__container flex items-center justify-center gap-1 rounded-full shadow-lg relative "
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
            >
              <div
                className="search-input w-1/3 px-6 rounded-full "
                onClick={() => setShowPopup(true)}
              >
                <button className="search-button w-full py-2 text-start">
                  <InputSearchBar
                    placeholder="Tìm kiếm điểm đến"
                    id="Địa điểm"
                    label="Địa điểm"
                    className=" border-none px-4 outline-none "
                    classNameLabel="font-bold"
                    value={searchInputValue}
                    onChange={handleInputChange}
                  />
                </button>
              </div>
              {showPopup && (
                <PopupLocation
                  locations={locations}
                  onSelectLocation={(location) => setSelectedLocation(location)}
                  onClose={(e) => {
                    setShowPopup(false);
                    e.stopPropagation();
                  }}
                  onFocus={() => setShowPopup(true)}
                />
              )}
              <div className="w-1/3 rounded-full relative">
                {activeButton === "Chỗ ở" ? (
                  <div className="flex items-center justify-center">
                    <div className="w-1/2 relative">
                      <ButtonCustom
                        value="Nhận phòng"
                        span={
                          startDate
                            ? startDate.format("DD-MM-YYYY")
                            : "Thêm ngày"
                        }
                        classNameBtn="btnSearch text-xs w-full py-2 px-6 text-start font-bold"
                        onClick={handleStartClick}
                      />
                      {isStartOpen && (
                        <DatePicker
                          open={isStartOpen}
                          onChange={handleStartDateChange}
                          onOpenChange={setIsStartOpen}
                          style={{ position: "absolute", top: "100%", left: 0 }}
                          disabledDate={(current) => {
                            let customDate = moment().format("YYYY-MM-DD");
                            return (
                              current &&
                              current < moment(customDate, "YYYY-MM-DD")
                            );
                          }}
                        />
                      )}
                    </div>
                    <div className="w-1/2 relative">
                      <ButtonCustom
                        value="Trả phòng"
                        span={
                          endDate ? endDate.format("DD-MM-YYYY") : "Thêm ngày"
                        }
                        classNameBtn="btnSearch text-xs w-full px-6 text-start font-bold"
                        onClick={handleEndClick}
                      />
                      {isEndOpen && (
                        <DatePicker
                          open={isEndOpen}
                          onChange={handleEndDateChange}
                          onOpenChange={setIsEndOpen}
                          disabledDate={disabledEndDate}
                          style={{ position: "absolute", top: "100%", left: 0 }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className=" flex items-center justify-start mx-auto ">
                    <div className="w-full relative">
                      <ButtonCustom
                        value="Ngày"
                        span={
                          endDate ? endDate.format("DD-MM-YYYY") : "Thêm ngày"
                        }
                        classNameBtn="btnSearch text-xs w-full px-6 text-start font-bold"
                        onClick={handleEndClick}
                      />
                      {isEndOpen && (
                        <DatePicker
                          open={isEndOpen}
                          onChange={handleEndDateChange}
                          onOpenChange={setIsEndOpen}
                          disabledDate={(current) => {
                            let customDate = moment().format("YYYY-MM-DD");
                            return (
                              current &&
                              current < moment(customDate, "YYYY-MM-DD")
                            );
                          }}
                          style={{ position: "absolute", top: "100%", left: 0 }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-1/3 flex items-center justify-center rounded-full relative">
                <div className="w-full">
                  <Guest />
                </div>
                <div onClick={handleSearch}>
                  {isFocused ? (
                    <button className="mag-glass__find px-4 py-3 flex items-center justify-center gap-2.5 absolute -right-12 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white ">
                      <i className="fa-regular fa-magnifying-glass"></i>
                      Tìm kiếm
                    </button>
                  ) : (
                    <button className="mag-glass px-4 py-4 flex items-center justify-center absolute -right-4 top-1/2 transition transform -translate-x-1/2 -translate-y-1/2 text-white ">
                      <i className="fa-regular fa-magnifying-glass"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
