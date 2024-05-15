import React, { useEffect, useState } from "react";
import { roomManagement } from "../../services/roomManagement";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import "./ListRoom.scss";
import RoomCard from "../../components/RoomCard/RoomCard";
const ListRoom = () => {
  const [listRoomArr, setListRoomArr] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
   
    <div className="w-full h-auto mx-auto flex items-center justify-center flex-wrap  py-2 border border-red-300">
    {listRoomArr &&
      listRoomArr.map((room) => (
        <RoomCard
        key={room.id}
        id={room.id}
        hinhAnh={room.hinhAnh}
        tenPhong={room.tenPhong}
        moTa={room.moTa}
        giaTien={room.giaTien}
      />
      ))}
  </div>
  );
};

export default ListRoom;
