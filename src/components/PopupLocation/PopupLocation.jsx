import React from "react";
import "./PopupLocation.scss";
import { NavLink } from "react-router-dom";

const PopupLocation = ({ locations, onSelectLocation, onClose }) => {
  return (
    <div className="popup-location">
      <button className="close-btn" onClick={onClose}>
        Đóng
      </button>
      <div className="popup-content">
        <ul className="grid">
          {locations.map((location) => (
            <li key={location.id}>
              <NavLink
                to=""
                className="location-item p-4 rounded-lg border border-gray-300 hover:shadow-md flex flex-col items-center justify-center transition duration-300 ease-in-out"
                onClick={() => {
                  onSelectLocation(location.tinhThanh);
                  onClose();
                }}
              >
                <img src={location.hinhAnh} alt="" className="w-16 h-16 mb-2" />
                <span className="text-sm">{location.tinhThanh}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopupLocation;
