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
        setListLocationArr(locationRes.data.content.slice(8, 12));
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoomData();
  }, []);
  return (
    <div>
      <div className="w-full mx-auto flex flex-col gap-3 items-center justify-start  py-2">
        <h2 className="font-semibold text-2xl">Past Experiences</h2>
        <div className="flex gap-4 flex-wrap">
          {listLocationArr &&
            listLocationArr.map((location) => (
              <div
                key={location.id}
                className="RoomCard sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 px-3 py-2 rounded-lg hover:shadow-lg  transition duration-300 ease-in-out"
              >
                <NavLink to={`/rooms/${convertToSlug(location.tinhThanh)}`}>
                  {location.hinhAnh && (
                    <img
                      src={location.hinhAnh}
                      alt=""
                      className="sm:h-72 md:h-72 xl:h-64 rounded-lg object-cover object-center"
                    />
                  )}
                  <h2 className="text-center font-semibold text-lg">
                    {location.tinhThanh}
                  </h2>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PastExperiences;
