import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "./RoomCard.scss";
const RoomCard = ({
  id,
  to,
  hinhAnh,
  tenPhong,
  moTa,
  giaTien,
  contentButton,
  handle,
  btnClass,
}) => {
  return (
    <div className="room-card mb-4 px-3 hover:rounded-lg hover:shadow-lg  transition duration-300 ease-in-out ">
      <div className="bg-white rounded-lg  flex flex-col h-full">
        <NavLink to={to} className="room-card__main flex flex-col h-full">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {hinhAnh && (
              <div>
                <SwiperSlide>
                  <img
                    src={hinhAnh}
                    alt={tenPhong}
                    className="room-card__img h-64 rounded-lg object-cover object-center"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={hinhAnh}
                    alt={tenPhong}
                    className="room-card__img  h-64 rounded-lg object-cover object-center"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={hinhAnh}
                    alt={tenPhong}
                    className="room-card__img  h-64 rounded-lg object-cover object-center"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={hinhAnh}
                    alt={tenPhong}
                    className="room-card__img  h-64 rounded-lg object-cover object-center"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={hinhAnh}
                    alt={tenPhong}
                    className="room-card__img  h-64 rounded-lg object-cover object-center"
                  />
                </SwiperSlide>
              </div>
            )}
          </Swiper>
          <div className="py-4 px-1 flex-grow flex flex-col">
            <div className="font-semibold text-lg  mb-2 truncate-title">
              {tenPhong}
            </div>
            <div className="text-gray-500 text-sm  mb-2 truncate-text">
              {moTa}
            </div>
            <div className="font-bold text-xl mt-auto">
              ${giaTien} <span className="font-normal text-base">/khách</span>
            </div>
          </div>
        </NavLink>
        <button className={btnClass} onClick={() => handle(id)}>
          {contentButton}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
