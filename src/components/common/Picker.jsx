import React, { useState } from "react";
import "../../componentsCss/Picker.css";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

export default function Picker({
  label,
  placeholder,
  options,
  selected,
  onSelect,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="picker-container">
      <div
        className="flex flex-col py-2"
        onClick={() => setOpen((open) => !open)}
      >
        <label>{label}</label>
        <div className={"input-container border p-2"}>
          <span className={"selection" + (selected ? " selected" : "")}>
            {selected}
          </span>
          <IoIosArrowDown
            className={"arrow" + (open ? " open" : "")}
            size={25}
          />
        </div>
      </div>
      {open && (
        <div className="options-container">
          {options.map((o) => (
            <div
              className="option"
              key={o}
              onClick={() => {
                onSelect(o);
                setOpen(false);
              }}
            >
              <span>{o}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
