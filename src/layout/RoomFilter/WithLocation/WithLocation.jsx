import React, { useEffect, useState } from "react";
import { locationManagement } from "../../../services/locationManagement";
import { NavLink } from "react-router-dom";
import { convertToSlug } from "../../../utils/util";
import "./WithLocation.scss";
const WithLocation = () => {
  const [listLocationArr, setListLocationArr] = useState([]);
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const locationRes = await locationManagement.getLocation();
        setListLocationArr(locationRes.data.content.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoomData();
  }, []);

  return (
    <div className="location-container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">
        Hiện có {listLocationArr.length} tỉnh, thành phố tại Việt Nam đang liên
        kết với Airbnb. {" "}
        <NavLink
          to="/rooms"
          className="all-room font-bold text-lg py-3 underline transition ease-in-out duration-300"
        >
          Toàn bộ nhà
        </NavLink>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {listLocationArr &&
          listLocationArr.map((location) => (
            <NavLink
              key={location.id}
              to={`/rooms/${convertToSlug(location.tinhThanh)}`}
              className="location-item  p-4 rounded-lg border border-gray-300 hover:shadow-md flex flex-col items-center justify-center transition duration-300 ease-in-out"
            >
              <img src={location.hinhAnh} alt="" className="w-16 h-16 mb-2" />
              <span className="text-sm">{location.tinhThanh}</span>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default WithLocation;
