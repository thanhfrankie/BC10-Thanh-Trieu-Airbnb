import React, { useContext, useEffect, useState } from "react";
import { bookingManagement } from "../../services/bookingRoomManagement";
import { roomManagement } from "../../services/roomManagement";
import { getLocalStorage } from "../../utils/util";
import Loading from "../../components/Loading/Loading";
import { NavLink } from "react-router-dom";
import useChangePageTitle from "../../hooks/useChangePageTitle";
import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import RoomCard from "../../components/RoomCard/RoomCard";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import "./Trips.scss";
const Trips = () => {
  const [listRoomArr, setListRoomArr] = useState([]);
  const [listBookedRoomArr, setListBookedRoomArr] = useState([]);
  const [userLocalInfo, setUserLocalInfo] = useState(null);
  const [showedRoomArr, setShowedRoomArr] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const notify = useContext(NotifyContext);
  useChangePageTitle("Chuyến đi của bạn - Airbnb");
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
      const matchedRooms = listRoomArr.reduce((accumulator, room) => {
        const matchedBookings = listBookedRoomArr.filter(
          (bookedRoom) => bookedRoom.maPhong === room.id
        );
        return accumulator.concat(matchedBookings.map(() => room));
      }, []);
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
        notify("Hủy phòng thành công");
      } catch (error) {
        console.error("Lỗi khi hủy đặt phòng:", error);
      }
    }
  };
  return (
    <div>
      <div className="px-56">
        <Header />
        {showedRoomArr.length !== 0 && (
          <h1 className="text-2xl font-bold my-4 ">Phòng đã thuê</h1>
        )}
        <div className="w-full h-auto mx-auto flex items-center justify-start flex-wrap py-2 ">
          {showedRoomArr &&
            showedRoomArr.map((room) => (
              <RoomCard
                key={room.id}
                to={`/room-detail/${room.id}`}
                id={room.id}
                hinhAnh={room.hinhAnh}
                tenPhong={room.tenPhong}
                moTa={room.moTa}
                giaTien={room.giaTien}
                btnClass="trips-cancel__button py-3 flex items-center justify-center rounded-lg text-white"
                handle={handleCancel}
                contentButton="Hủy"
              />
            ))}
          {showedRoomArr.length === 0 && (
            <div>
              <div className="h-auto px-56">
                <div className="h-screen-70 mt-4">
                  <h1 className="font-bold text-3xl">Chuyến đi</h1>
                  <div className="trips-find__trip flex flex-col gap-4 py-5 my-5">
                    <h1 className="font-semibold text-xl">
                      Chưa có chuyến đi nào được đặt... vẫn chưa!
                    </h1>
                    <h2>
                      Đã đến lúc phủi bụi vali và bắt đầu chuẩn bị cho chuyến
                      phiêu lưu tiếp theo của bạn rồi.
                    </h2>
                    <div>
                      Bắt đầu {""}
                      <NavLink
                        to="/"
                        className="trips-find__room hover:underline"
                      >
                        tìm kiếm
                      </NavLink>
                      {""} nào
                    </div>
                  </div>
                  <div>
                    Bạn không tìm thấy đặt phòng/đặt chỗ của mình ở đây?{" "}
                    <button className="underline font-medium">
                      Truy cập Trung tâm trợ giúp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Trips;
