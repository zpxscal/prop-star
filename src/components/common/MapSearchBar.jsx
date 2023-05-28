import React, { useState } from "react";
import "../../componentsCss/MapSeachBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import axios from "axios";
import LocationPicker from "./LocationPicker";

export default function MapSearchBar({ onSelect, onFilter }) {
  const [filter, setFilter] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleFilter = (i) => {
    if (i === filter) {
      setFilter(null);
      onFilter(null);
      return;
    }

    setFilter(i);
    onFilter(i);
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="mapSearchbar">
      <div className="filter-container">
        <LocationPicker onSelect={(loc) => onSelect(loc)} shadow />
        <BsFilterLeft className="filter-icon" size={25} onClick={handlePopup} />
        {showPopup && (
          <div className="popup-container">
            <p>KesSaft</p>
          </div>
        )}
      </div>
      <div className="filters">
        <span
          className={"filter" + (filter === "home" ? " active" : "")}
          onClick={() => handleFilter("home")}
        >
          Home
        </span>
        <span
          className={"filter" + (filter === "property" ? " active" : "")}
          onClick={() => handleFilter("property")}
        >
          Property
        </span>
        <span
          className={"filter" + (filter === "industry" ? " active" : "")}
          onClick={() => handleFilter("industry")}
        >
          Industry
        </span>
      </div>
    </div>
  );
}
