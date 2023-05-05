import React, { useState } from "react";
import "../../componentsCss/MapSeachBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import axios from "axios";

export default function MapSearchBar({ onSelect, onFilter }) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [filter, setFilter] = useState(null);
  const [inputTiming, setInputTiming] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    clearTimeout(inputTiming);
    setInputTiming(
      setTimeout(() => {
        handleLoadData(e.target.value);
      }, 1000)
    );
  };

  const handleLoadData = (info) => {
    if (info.length <= 3) return;

    //hatte keine Lust auf Google also hab ich OpenStreetMap genutzt :D
    axios
      .get("https://nominatim.openstreetmap.org/search", {
        params: { q: info, format: "json", addressdetails: 1 },
      })
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelection = (i) => {
    const latSize = i.boundingbox[1] - i.boundingbox[0];
    const lonSize = i.boundingbox[3] - i.boundingbox[2];
    const { house_number, road, city, village, country, town } = i.address;

    setSearch(
      `${road || ""} ${house_number || ""}${road || house_number ? ", " : ""}${
        city || town || village || ""
      } ${country}`
    );
    setOptions([]);

    onSelect({
      lat: i.lat,
      lon: i.lon,
      size: latSize > lonSize ? latSize : lonSize,
    });
  };

  const handleFilter = (i) => {
    if (i === filter) {
      setFilter(null);
      onFilter(null);
      return;
    }

    setFilter(i);
    onFilter(i);
  };

  return (
    <div className="mapSearchbar">
      <div className="filter-container">
        <div className="input-container">
          <input
            placeholder="Address"
            value={search}
            onChange={handleSearchChange}
          />
          <BiSearchAlt2 size={25} />
        </div>
        <BsFilterLeft className="filter-icon" size={25} />
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
      {options.length > 0 && search && (
        <div className="options-container">
          {options.map((o) => (
            <div
              className="option"
              key={o.place_id}
              onClick={() => handleSelection(o)}
            >
              <span>
                {o.address.road} {o.address.house_number || ""}
                <small>
                  {" "}
                  {o.address.postcode}{" "}
                  {o.address.city || o.address.town || o.address.village}{" "}
                  {o.address.country}
                </small>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
