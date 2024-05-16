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
              {/* <div>
              <div className="room-booking rounded-lg shadow-lg p-4  flex flex-col gap-5">
                <div className="flex items-center justify-between">

                <div className="room-price font-bold text-3xl">
                  ${giaTien} <span className="font-normal">mỗi khách</span>
                </div>
                  <div className=" flex items-center justify-center gap-2">
                    <div className="star-icon"><svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg></div>
                    <div className="font-bold">

                    {averageRating}
                    </div>
                    <div className="underline">({listCommentArr.length}) <span>đánh giá</span></div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  Ngừng nhận yêu cầu: {calculateNext7DaysTime()}
                </div>
                <div></div>
                <button onClick={handleBookRoom} className="room-booking__button py-5 flex items-center justify-center rounded-lg text-white border border-pink-500">
                 Yêu cầu
                </button>
                </div>
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PastExperiences;
