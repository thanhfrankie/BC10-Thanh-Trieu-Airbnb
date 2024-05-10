import React from "react";
import { filterIcon } from "../../assets/filter-icon/filter-icon";
import "./RoomFilter.scss";
const RoomFilter = () => {
  return (
    <div className="filterIconContainer border border-red-300">
      {filterIcon.map((item, index) => (
        <div
          key={index}
          className="filterIconDiv border border-yellow-300"
        >
            <img src={item.icon} alt="" className="filterIcon" />
            <p className="text-sm text-center">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default RoomFilter;
