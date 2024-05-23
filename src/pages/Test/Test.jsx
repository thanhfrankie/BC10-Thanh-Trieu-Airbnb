import React, { useEffect, useState } from "react";
import { roomManagement } from "../../services/roomManagement";
import RoomCard from "../../components/RoomCard/RoomCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { NavLink } from "react-router-dom";
import "./Test.scss";
const Test = () => {
  const [listRoomArr, setListRoomArr] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const res = await roomManagement.getAllRoom();
        setListRoomArr(res.data.content.filter((room) => room.maViTri !== 0));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);
  return (
    <div className="w-full h-auto mx-auto flex items-center justify-start flex-wrap  py-2">
      {listRoomArr &&
        listRoomArr.slice(0, 11).map((room) => (
          <div className="RoomCard  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 px-3 hover:rounded-lg hover:shadow-lg  transition duration-300 ease-in-out ">
            <div className="bg-white rounded-lg  flex flex-col h-full">
              <NavLink
                to={`room-detail/${room.id}`}
                className="flex flex-col h-full"
              >
                <Swiper
                  cssMode={true}
                  navigation={true}
                  pagination={true}
                  mousewheel={true}
                  keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper"
                >
                  {room.hinhAnh && (
                    <div className="h-72">
                      <SwiperSlide>
                        {" "}
                        <img
                          src={room.hinhAnh}
                          alt={room.tenPhong}
                          className="RoomCardImg h-72 sm:h-72 md:h-72 xl:h-64 rounded-lg object-cover object-center"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <img
                          src={room.hinhAnh}
                          alt={room.tenPhong}
                          className="RoomCardImg h-72 sm:h-72 md:h-72 xl:h-64 rounded-lg object-cover object-center"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <img
                          src={room.hinhAnh}
                          alt={room.tenPhong}
                          className="RoomCardImg h-72 sm:h-72 md:h-72 xl:h-64 rounded-lg object-cover object-center"
                        />
                      </SwiperSlide>{" "}
                    </div>
                  )}
                </Swiper>
                <div className="py-4 px-1 flex-grow flex flex-col">
                  <div className="font-semibold text-lg  mb-2 truncate-title">
                    {room.tenPhong}
                  </div>
                  <div className="text-gray-500 text-sm  mb-2 truncate-text">
                    {room.moTa}
                  </div>
                  <div className="font-bold text-xl mt-auto">
                    ${room.giaTien}{" "}
                    <span className="font-normal text-base">/khách</span>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Test;
