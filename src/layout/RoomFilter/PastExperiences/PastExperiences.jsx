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
        setListLocationArr(locationRes.data.content.slice(8, 11));
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoomData();
  }, []);
  return (
    <div className="py-2 h-full">
      <h2 className="font-semibold text-2xl pb-3">Trải nghiệm đã qua</h2>
      <div className="w-full h-full flex flex-wrap rounded-lg gap-3 items-center">
          {listLocationArr &&
            listLocationArr.map((location) => (
              <div
                key={location.id}
                className="sm:w-1/3 sm:mx-1 md:w-1/4 lg:w-1/4 xl:w-1/5 h-full flex items-center justify-center rounded-lg hover:shadow-lg  transition duration-300 ease-in-out "
              >
                <NavLink to={`/rooms/${convertToSlug(location.tinhThanh)}`} className="w-full h-full hover:shadow-lg ">
                  {location.hinhAnh && (
                    <img
                      src={location.hinhAnh}
                      alt=""
                      className="w-full h-full rounded-lg  object-cover sm:h-72 xl:h-64"
                    />
                  )}
                  <h2 className="py-3 text-center font-semibold text-lg">
                    {location.tinhThanh}
                  </h2>
                </NavLink>
              </div>
            ))}
        </div>
    </div>
  );
};

export default PastExperiences;
