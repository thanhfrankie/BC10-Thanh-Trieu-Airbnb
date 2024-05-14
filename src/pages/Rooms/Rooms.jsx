import React, { useEffect, useState } from "react";
import { roomManagement } from "../../services/roomManagement";
import Loading from "../../components/Loading/Loading";

import "./Rooms.scss";
import { NavLink } from "react-router-dom";
import useChangePageTitle from "../../hooks/useChangePageTitle";
const Rooms = () => {
  const [listRoomArr, setListRoomArr] = useState([]);
  const [loading, setLoading] = useState(true);
  useChangePageTitle("Airbnb | Nhà nghỉ dưỡng cho thuê, cabin, nhà trên bãi biển, v.v.")
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const res = await roomManagement.getAllRoom();
        console.log(res.data.content);
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
      {listRoomArr && (
        <h2>Hiện có {listRoomArr.length} địa điểm cho thuê tại quốc gia Việt Nam</h2>
      )}

      <div className="w-full h-auto mx-auto flex items-center justify-center flex-wrap mt-3 py-2 border border-red-300">
        {listRoomArr &&
          listRoomArr.map((room) => (
            <div key={room.id} className="grid-cols-4 mx-auto border-red-300">
              <div className="w-full">
                <NavLink to={`/room-detail/${room.id}`}>
                  {room.hinhAnh && <img src={room.hinhAnh} alt="" />}
                  <div>{room.tenPhong}</div>
                  <div>{room.moTa}</div>
                  <div className="font-bold">
                    ${room.giaTien} <span className="font-normal">/khách</span>
                  </div>
                </NavLink>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Rooms;
