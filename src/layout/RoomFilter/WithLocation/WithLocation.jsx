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
    <div>
      <h2>
        Hiện có {listLocationArr.length} tỉnh, thành phố tại Việt Nam đang liên
        kết với Airbnb
      </h2>
      {listLocationArr &&
        listLocationArr.map((location) => (
          <div key={location.id}>
            <NavLink to={`/rooms/${convertToSlug(location.tinhThanh)}`}>
              {location.tinhThanh}
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default WithLocation;
