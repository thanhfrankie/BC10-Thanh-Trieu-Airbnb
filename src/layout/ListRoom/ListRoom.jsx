import React, { useEffect, useState } from "react";
import { roomManagement } from "../../services/roomManagement";

const ListRoom = () => {
  const [listRoomArr, setListRoomArr] = useState([]);
  useEffect(() => {
    roomManagement
      .getAllRoom()
      .then(function (res) {
        console.log(res.data.content);
        setListRoomArr(res.data.content);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full h-auto mx-auto flex items-center justify-center flex-wrap mt-3 py-2 border border-red-300">
        {listRoomArr.map((room, index) => (
      <div className="grid-cols-4 mx-auto border-red-300">
          <div key={index} className="h-screen w-full">
            <div>
              <div>{room.tenPhong}</div>
              <div>aaaa</div>
            </div>
          </div>
      </div>
        ))}
    </div>
  );
};

export default ListRoom;
