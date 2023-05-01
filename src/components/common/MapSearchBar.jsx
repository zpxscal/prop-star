import React, { useState } from "react";
import "../../componentsCss/MapSeachBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";

export default function MapSearchBar({ onSelect }) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
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
    if (search.length <= 3) return;

    //hatte keine Lust auf Google also hab ich OpenStreetMap genutzt :D
    axios
      .get("https://nominatim.openstreetmap.org/search", {
        params: { q: info, format: "json", addressdetails: 1 },
      })
      .then((res) => {
        console.log(res);
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("fetch data");
  };

  const handleSelection = (i) => {
    setSearch(
      `${i.address.road} ${i.address.house_number || ""}, ${
        i.address.country
      } ${i.address.city || i.address.village} ${i.address.country}`
    );
    setOptions([]);
    onSelect({ lat: i.lat, lon: i.lon });
  };

  return (
    <div className="mapSearchbar">
      <div className="input-container">
        <input
          placeholder="Address"
          value={search}
          onChange={handleSearchChange}
        />
        <BiSearchAlt2 size={25} />
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
                  {o.address.postcode} {o.address.city || o.address.village}{" "}
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
