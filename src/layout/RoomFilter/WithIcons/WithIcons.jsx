import React, { useState } from "react";
import { filterIcon } from "../../../assets/filter-icon/filter-icon";
import "./WithIcons.scss";
const WithIcons = () => {
  let [selectedFilter, setSelectedFilter] = useState(0);
  return (
    // <div className="filterIconContainer border border-red-300">
    //   {filterIcon.map((item, index) => (
    //     <div
    //       key={index}
    //       className={`filterIconDiv ${
    //         index == selectedFilter && "selectedIcon"
    //       } border border-red-500`}
    //       onClick={() => {
    //         console.log(index);
    //         setSelectedFilter(index);
    //       }}
    //     >
    //       <img src={item.icon} alt="" className="filterIcon" />
    //       <p className="label text-sm text-center min-w-56 border border-red-500">{item.label}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="filterIconContainer border border-red-300">
      {filterIcon.map((item, index) => (
        <div
          key={index}
          className={`filterIconDiv ${
            index === selectedFilter ? "selectedIcon" : ""
          } min-w-56 border border-red-500`}
          onClick={() => {
            console.log(index);
            setSelectedFilter(index);
          }}
        >
          <img src={item.icon} alt="" className="filterIcon" />
          <p className="label text-sm text-center  border border-red-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WithIcons;
