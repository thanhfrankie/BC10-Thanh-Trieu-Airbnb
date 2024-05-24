import React, { useEffect, useState } from "react";
import { roomManagement } from "../../services/roomManagement";
import Loading from "../../components/Loading/Loading";
import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import useChangePageTitle from "../../hooks/useChangePageTitle";
import RoomCard from "../../components/RoomCard/RoomCard";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
const Rooms = () => {
  const [listRoomArr, setListRoomArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useChangePageTitle(
    "Airbnb | Nhà nghỉ dưỡng cho thuê, cabin, nhà trên bãi biển, v.v."
  );
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
  }, [setListRoomArr]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="">
        <Header />
        {listRoomArr && (
          <h2 className="text-2xl font-semibold py-3 px-4">
            Hiện có {listRoomArr.length} địa điểm cho thuê
          </h2>
        )}
        <div className="w-full h-auto mx-auto flex items-center justify-start flex-wrap  py-2">
          {listRoomArr &&
            listRoomArr.map((room) => (
              <RoomCard
                to={`/room-detail/${room.id}`}
                key={room.id}
                id={room.id}
                hinhAnh={room.hinhAnh}
                tenPhong={room.tenPhong}
                moTa={room.moTa}
                giaTien={room.giaTien}
              />
            ))}
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Rooms;
