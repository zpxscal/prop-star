import React, { useState, useEffect } from "react";
import "../../componentsCss/MapSeachBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import axios from "axios";
import LocationPicker from "./LocationPicker";

export default function MapSearchBar({ onSelect, onFilter }) {
  const [filter, setFilter] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/item/types")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        {types.map((t) => (
          <span
            className={"filter" + (filter === t ? " active" : "")}
            onClick={() => handleFilter(t)}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
