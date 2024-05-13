import React, { useState } from "react";
import { filterIcon } from "../../assets/filter-icon/filter-icon";
import "./RoomFilter.scss";
const RoomFilter = () => {
  let [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <div className="filterIconContainer border border-red-300">
      {filterIcon.map((item, index) => (
        <div
          key={index}
          className={`filterIconDiv ${
            index == selectedFilter && "selectedIcon"
          } border border-yellow-300`}
          onClick={() => {
            console.log(index)
            setSelectedFilter(index);
          }}
        >
          <img src={item.icon} alt="" className="filterIcon" />
          <p className="text-sm text-center">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default RoomFilter;
