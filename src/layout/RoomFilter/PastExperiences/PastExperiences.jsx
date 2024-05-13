import React, { useEffect, useState } from "react";
import { locationManagement } from "../../../services/locationManagement";
import { NavLink } from "react-router-dom";
import { convertToSlug } from "../../../utils/util";

const PastExperiences = () => {
  const [listLocationArr, setListLocationArr] = useState([]);
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const locationRes = await locationManagement.getLocation();
        console.log(locationRes);
        setListLocationArr(locationRes.data.content.slice(10, 14));
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoomData();
  }, []);
  return (
    <div>
      <h2>PastExperiences</h2>
      <div>
        {listLocationArr &&
          listLocationArr.map((location) => (
            <div key={location.id}>
              <NavLink to={`/rooms/${convertToSlug(location.tinhThanh)}`}>
                {location.hinhAnh && <img src={location.hinhAnh} alt="" />}
                {location.tinhThanh}
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PastExperiences;
