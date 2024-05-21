import React, { useEffect, useState } from "react";
import InputSearchBar from "../../../components/Input/InputSearchBar";
import ButtonCustom from "../../../components/Button/ButtonCustom";
import { NavLink } from "react-router-dom";
import PopupLocation from "../../../components/PopupLocation/PopupLocation";
import { locationManagement } from "../../../services/locationManagement";

const SearchBar = () => {
  const [locations, setLocations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationManagement.getLocation();
        console.log(response)
        setLocations(response.data.content.slice(0, 10));
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);
  return (
    <div className="w-full" onClick={() => setShowPopup(true)}>
      <button
        className="btn-search__mobile w-full flex items-center justify-start gap-4 px-2 py-2 border border-gray-300"
      >
        <i class="fa-sharp fa-solid fa-magnifying-glass text-xl"></i>
        <div className="flex flex-col justify-start items-start">
          <div className="text-md font-semibold">Bạn sẽ đi đâu?</div>
          <div className="text-sm">Địa điểm bất • kỳ Thời gian bất kỳ • Thêm khách</div>
        </div>
      </button>
      {showPopup && (
                <PopupLocation
                  locations={locations}
                  onSelectLocation={(location) => setSelectedLocation(location)}
                  onClose={(e) => {
                    setShowPopup(false);
                    e.stopPropagation();
                  }}
                  onBlur={() => setShowPopup(false)}
                />
              )}
    </div>
  );
};

export default SearchBar;
