import React, { useEffect, useState } from "react";
import { locationManagement } from "../../../services/locationManagement";
import "./WithLocation.scss";
import { NavLink } from "react-router-dom";
import { convertToSlug } from "../../../utils/util";
const WithLocation = () => {
  const [listLocationArr, setListLocationArr] = useState([]);
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const locationRes = await locationManagement.getLocation();
        console.log(locationRes);
        setListLocationArr(locationRes.data.content.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoomData();
  }, []);

  return (
    <div className="location-container border border-red-400 mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">
        Hiện có {listLocationArr.length} tỉnh, thành phố tại Việt Nam đang liên kết với Airbnb
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
