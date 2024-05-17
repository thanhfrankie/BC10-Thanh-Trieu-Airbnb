import React, { useEffect, useRef } from "react";
import "./PopupLocation.scss";
import { NavLink } from "react-router-dom";
import { convertToSlug } from "../../utils/util";

const PopupLocation = ({
  locations,
  onSelectLocation,
  onClose,
  onBlur,
  onFocus,
}) => {
  const currentDiv = useRef();

  useEffect(() => {
    currentDiv.current.focus();
  }, []);

  return (
    <div
      className="popup-location"
      onBlur={onBlur}
      onFocus={onFocus}
      tabindex="-1"
      ref={currentDiv}
    >
      <button className="popup-close__btn" onClick={onClose}>
        Đóng
      </button>
      <div className="popup-content">
    
        <ul className="popup-grid">
          {locations.map((location) => (
            <li key={location.id}>
              <NavLink
                to={`/rooms/${convertToSlug(location.tinhThanh)}`}
                className="popup-location__item p-4 rounded-lg border border-gray-300 hover:shadow-lg flex flex-col items-center justify-center transition duration-300 ease-in-out"
                onClick={() => {
                  onSelectLocation(location.tinhThanh);
                  onClose();
                }}
              >
                <img src={location.hinhAnh} alt="" className="w-12 h-12 mb-2" />
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
