import React, { useEffect, useState } from "react";
import { bookingManagement } from "../../services/bookingRoomManagement";
import { roomManagement } from "../../services/roomManagement";
import { getLocalStorage } from "../../utils/util";
import "./Trips.scss";
import Loading from "../../components/Loading/Loading";
import { NavLink } from "react-router-dom";
const Trips = () => {
  const [listRoomArr, setListRoomArr] = useState([]);
  const [listBookedRoomArr, setListBookedRoomArr] = useState([]);
  const [userLocalInfo, setUserLocalInfo] = useState(null);
  const [showedRoomArr, setShowedRoomArr] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  useEffect(() => {
    const fetchUserData = () => {
      const userLocal = getLocalStorage("user");
      if (userLocal && userLocal.user) {
        setUserLocalInfo(userLocal.user);
      } else {
        setLoadingRooms(false);
        setLoadingBookings(false);
      }
    };

    const fetchRoomData = async () => {
      try {
        const res = await roomManagement.getAllRoom();
        setListRoomArr(res.data.content.filter((room) => room.maViTri !== 0));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchUserData();
    fetchRoomData();
  }, []);
  useEffect(() => {
    if (userLocalInfo !== null) {
      const fetchBookedRoomData = async () => {
        try {
          const bookedRoomRes = await bookingManagement.getBookedRoom(
            userLocalInfo.id
          );
          setListBookedRoomArr(bookedRoomRes.data.content);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu phòng đã đặt:", error);
        } finally {
          setLoadingBookings(false);
        }
      };

      fetchBookedRoomData();
    }
  }, [userLocalInfo]);

  useEffect(() => {
    if (listRoomArr.length > 0 && listBookedRoomArr.length > 0) {
      console.log("List Room Array:", listRoomArr);
      console.log("List Booked Room Array:", listBookedRoomArr);
      const matchedRooms = listRoomArr.reduce((accumulator, room) => {
        const matchedBookings = listBookedRoomArr.filter(
          (bookedRoom) => bookedRoom.maPhong === room.id
        );
        return accumulator.concat(matchedBookings.map(() => room));
      }, []);
      console.log("Matched Rooms:", matchedRooms);
      setShowedRoomArr(matchedRooms.reverse());
    }
  }, [listRoomArr, listBookedRoomArr]);
  if (loadingRooms || loadingBookings) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const handleCancel = async (bookedRoomId) => {
    const bookingToCancel = listBookedRoomArr.find(
      (bookedRoom) => bookedRoom.maPhong === bookedRoomId
    );
    if (bookingToCancel && window.confirm("Bạn muốn hủy chứ?")) {
      try {
        await bookingManagement.deleteBookedRoom(bookingToCancel.id);

        const updatedBookedRooms = listBookedRoomArr.filter(
          (bookedRoom) => bookedRoom.id !== bookingToCancel.id
        );
        setListBookedRoomArr(updatedBookedRooms);

        const updatedShowedRooms = showedRoomArr.filter(
          (room) => room.id !== bookedRoomId
        );
        setShowedRoomArr(updatedShowedRooms);
      } catch (error) {
        console.error("Lỗi khi hủy đặt phòng:", error);
      }
    }
  };
  if (!userLocalInfo) {
    return (
      <div>
        <h1>Vui lòng đăng nhập để tiếp tục</h1>
        <NavLink to="/sign-in">Đăng nhập</NavLink>
      </div>
    );
  }
  return (
    <div>
      
      {showedRoomArr.length > 0 ? (
        showedRoomArr
          .map((room, index) => (
            <div key={index}>
              {room.hinhAnh}
              <div>{ room.id}</div>
              <button onClick={() => handleCancel(room.id)}>Hủy</button>
            </div>
          ))
      ) : (
        <div>
          <h1>Chưa có chuyến đi nào được đặt... vẫn chưa!</h1>
          <h2>
            Đã đến lúc phủi bụi vali và bắt đầu chuẩn bị cho chuyến phiêu lưu
            tiếp theo của bạn rồi.
          </h2>
          <NavLink to="/">Bắt đầu tìm kiếm</NavLink>
        </div>
      )}
    </div>
  );
};

export default Trips;
