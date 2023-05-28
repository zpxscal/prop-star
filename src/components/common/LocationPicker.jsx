import React, { useState } from "react";
import "../../componentsCss/LocationPicker.css";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";

export default function LocationPicker({ shadow, onSelect }) {
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
      place_id: i.place_id,
      lat: i.lat,
      lon: i.lon,
      size: latSize > lonSize ? latSize : lonSize,
    });
  };

  return (
    <div className="picker-container">
      <div className={"input-container" + (shadow ? " shadow" : " border p-2")}>
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
