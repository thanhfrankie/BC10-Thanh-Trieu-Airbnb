import React, { useEffect, useState } from "react";
import { roomManagement } from "../../services/roomManagement";
import { locationManagement } from "../../services/locationManagement";
import { NavLink, useParams } from "react-router-dom";
import { convertToSlug } from "../../utils/util";
import Loading from "../../components/Loading/Loading";
import { mapInfo } from "../../assets/map/map";
import Header from "../../layout/Header/Header";
import useChangePageTitle from "../../hooks/useChangePageTitle";
import Footer from "../../layout/Footer/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "./RoomLocation.scss";
const RoomLocation = () => {
  const [listLocationArr, setListLocationArr] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [listRoomByLocationArr, setListRoomByLocaTionArr] = useState([]);
  const [embededMap, setEmbededMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locationId } = useParams();
  useChangePageTitle(
    "Airbnb | Nhà nghỉ dưỡng cho thuê, cabin, nhà trên bãi biển, v.v."
  );
  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        const locationRes = await locationManagement.getLocation();
        setListLocationArr(locationRes.data.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);
  useEffect(() => {
    let location = null;
    listLocationArr?.forEach((place) => {
      if (locationId === convertToSlug(place.tinhThanh)) {
        location = {
          id: place.id,
          tenViTri: place.tenViTri,
          tinhThanh: place.tinhThanh,
          quocGia: place.quocGia,
        };
      }
      return;
    });
    setCurrentLocation(location);
  }, [listLocationArr, locationId]);

  useEffect(() => {
    const fetchRoomByLocation = async () => {
      if (currentLocation) {
        try {
          const roomRes = await roomManagement.getRoomByLocation(
            currentLocation.id
          );
          setListRoomByLocaTionArr(roomRes.data.content);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchRoomByLocation();
  }, [currentLocation]);
  useEffect(() => {
    const findMapByLocation = (location) => {
      if (!location) return null;
      const foundLocation = mapInfo.find(
        (map) =>
          convertToSlug(map.tinhThanh) === convertToSlug(location.tinhThanh)
      );
      return foundLocation ? foundLocation.embed : null;
    };
    if (currentLocation) {
      let embed = findMapByLocation(currentLocation);
      setEmbededMap(embed);
    }
  }, [currentLocation]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const { tinhThanh, quocGia } = currentLocation || {};
  return (
    <div>
      <div className="mb-5">
        <Header />
        <div>
          {listRoomByLocationArr.length === 0 ? (
            <div className="h-screen-70 mt-3 px-20">
              {tinhThanh && quocGia ? (
                <div className="my-3">
                  Hiện không có chỗ cho thuê tại {tinhThanh}, {quocGia}. Vui
                  lòng quay lại{" "}
                  <NavLink
                    to="/"
                    className="text-blue-700 hover:underline transition ease-in-out duration-300"
                  >
                    trang chủ
                  </NavLink>{" "}
                  để tiếp tục
                  <button className="room-booking__button mt-3 py-5 px-7 flex items-center justify-center rounded-lg text-white border border-pink-500">
                    Yêu cầu
                  </button>
                </div>
              ) : (
                <p>
                  Có vẻ nơi bạn tìm kiếm không có hoặc chưa liên kết với Airbnb.
                  Vui lòng quay lại{" "}
                  <NavLink
                    to="/"
                    className="text-blue-700 hover:underline transition ease-in-out duration-300"
                  >
                    trang chủ
                  </NavLink>{" "}
                  để tiếp tục
                </p>
              )}
            </div>
          ) : (
            <div className="w-full ">
              <div className="w-full px-20 py-1 ">
                Có {listRoomByLocationArr.length} chỗ cho thuê tại {tinhThanh},{" "}
                {quocGia}.
              </div>
              <div className="font-bold text-2xl px-20 py-2 ">
                Chỗ ở tại khu vực bản đồ đã chọn
              </div>
            </div>
          )}
        </div>
        <div className="room-location__main ">
          <div className="room-location__list flex flex-col gap-4 ">
            {listRoomByLocationArr.map((room) => (
              <div key={room.id} className="w-full ">
                <NavLink
                  to={`/room-detail/${room.id}`}
                  className="w-full flex py-3 rounded-lg hover:shadow-lg  transition duration-300 ease-in-out"
                >
                  <div className="location-img__container w-1/2 rounded-lg">
                    {room.hinhAnh && (
                      <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="mySwiper"
                        lazy={true}
                      >
                        {Array(5)
                          .fill(room.hinhAnh)
                          .map((imgSrc, index) => (
                            <SwiperSlide key={index}>
                              <img
                                src={imgSrc}
                                alt={`${room.tenPhong} ${index + 1}`}
                                className="w-full h-72 rounded-lg object-cover"
                                loading="lazy"
                              />
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    )}
                  </div>
                  <div className="w-1/2 flex flex-col items-start justify-between gap-3 px-2 ">
                    <div className="w-full flex flex-col gap-3 ">
                      <div className="w-full text-xl font-semibold truncate ">
                        {room.tenPhong}
                      </div>
                      <div className="w-full truncate">
                        {" "}
                        {room.khach} khách • {room.phongNgu} phòng ngủ •{" "}
                        {room.giuong} giường • {room.phongTam} phòng tắm
                      </div>
                      <div className="w-full flex flex-wrap gap-3 ">
                        {room.bep && <p>Bếp</p>}
                        {room.wifi && <p>Wifi</p>}
                        {room.tivi && <p>Tivi</p>}
                        {room.dieuHoa && <p>Điều hòa</p>}
                        {room.mayGiat && <p>Máy giặt</p>}
                        {room.banLa && <p>Bàn là</p>}
                        {room.banUi && <p>Bàn ủi</p>}
                        {room.doXe && <p>Đỗ xe</p>}
                        {room.hoBoi && <p>Hồ bơi</p>}
                      </div>
                    </div>
                    <div className="w-full font-bold text-end ">
                      ${room.giaTien}{" "}
                      <span className="font-normal ">/khách</span>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="room-location__map">{embededMap}</div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default RoomLocation;
