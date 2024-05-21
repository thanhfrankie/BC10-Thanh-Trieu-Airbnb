import React, { useState, useRef, useEffect } from "react";
import { filterIcon } from "../../../assets/filter-icon/filter-icon";
import "./WithIcons.scss";
const WithIcons = () => {
  let [selectedFilter, setSelectedFilter] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (event) => {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    };

    if (container) {
      container.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="filter-icon__container border border-red-400" ref={containerRef}>
      {filterIcon.map((item, index) => (
        <div
          key={index}
          className={`filter-icon__div ${
            index === selectedFilter ? "selected-icon" : ""
          } min-w-48 lg:min-w-44`}
          onClick={() => {
           
            setSelectedFilter(index);
          }}
        >
          <img src={item.icon} alt="" className="filter-icon" />
          <p className="label text-sm text-center">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WithIcons;
