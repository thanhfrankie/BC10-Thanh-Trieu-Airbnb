import React, { useState } from 'react'
import InputSearchBar from '../../../components/Input/InputSearchBar';
import ButtonCustom from '../../../components/Button/ButtonCustom';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
    const [activeButton, setActiveButton] = useState("Chỗ ở");
    const [isFocused, setIsFocused] = useState(false);
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
      };
  return (
      <div>
 
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
  )
}

export default SearchBar