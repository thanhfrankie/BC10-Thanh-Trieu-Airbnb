import React, { useEffect, useState } from "react";
import { roomManagement } from "../../services/roomManagement";
import { locationManagement } from "../../services/locationManagement";
import { useParams } from "react-router-dom";
import { convertToSlug } from "../../utils/util";
import Loading from "../../components/Loading/Loading";

const RoomLocation = () => {
  const [listRoomArr, setListRoomArr] = useState([]);
  const [listLocationArr, setListLocationArr] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [listRoomByLocationArr, setListRoomByLocaTionArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locationId } = useParams();
  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        const roomRes = await roomManagement.getAllRoom();
        setListRoomArr(roomRes.data.content);

        const locationRes = await locationManagement.getLocation();
        setListLocationArr(locationRes.data.content);
        setLoading(false);
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
      if (locationId == convertToSlug(place.tinhThanh)) {
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
        setLoading(true);
        try {
          const roomRes = await roomManagement.getRoomByLocation(
            currentLocation.id
          );
          console.log(roomRes.data.content);
          setListRoomByLocaTionArr(roomRes.data.content);
          setLoading(false);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRoomByLocation();
  }, [currentLocation]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const { id, tinhThanh } = currentLocation || {};
  return (
    <div>
      <div>
        Có {listRoomByLocationArr.length} chỗ tại {tinhThanh}
      </div>
      {listRoomByLocationArr.map((room) => (
        <div key={room.id}>
          <img src={room.hinhAnh} alt="" />
          <div>{room.tenPhong}</div>
          <div>{room.moTa}</div>
          <div className="font-bold">
            ${room.giaTien} <span className="font-normal">/khách</span>
          </div>
        </div>
      ))}
      <div>{id}</div>
    </div>
  );
};

export default RoomLocation;
