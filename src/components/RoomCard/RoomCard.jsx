import React from "react";
import { NavLink } from "react-router-dom";

const RoomCard = ({ id, hinhAnh, tenPhong, moTa, giaTien }) => {
  return (
    <div className="RoomCard w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 px-3 hover:rounded-lg hover:shadow-lg  transition duration-300 ease-in-out">
      <div className="bg-white rounded-lg  flex flex-col h-full">
        <NavLink to={`room-detail/${id}`} className="flex flex-col h-full">
          {hinhAnh && (
            <img
              src={hinhAnh}
              alt={tenPhong}
              className="RoomCardImg w-full sm:h-72 md:h-72 xl:h-64 rounded-lg object-cover object-center"
            />
          )}
          <div className="py-4 px-1 flex-grow flex flex-col">
            <div className="font-semibold text-lg  mb-2 truncate-title">
              {tenPhong}
            </div>
            <div className="text-gray-500 text-sm  mb-2 truncate-text">{moTa}</div>
            <div className="font-bold text-xl mt-auto">
              ${giaTien} <span className="font-normal text-base">/khách</span>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default RoomCard;
