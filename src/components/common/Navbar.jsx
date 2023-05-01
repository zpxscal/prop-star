import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <div className="flex items-center">
        <img
          className="w-[50px]"
          src={logo}
          alt="Logo"
          style={{ marginRight: "10px" }}
        />
        <h1 className="text-3xl font-bold text-[#00df9a]">PROP-STAR.</h1>
      </div>

      <ul className="hidden md:flex">
        <li className="p-4">
          <a href="/">Home</a>
        </li>

        <li className="p-4">
          <a href="/about">About</a>
        </li>

        <li className="p-4">
          <a href="/map">Map</a>
        </li>

        <li className="p-4">
          <a href="/login">Login</a>
        </li>
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
        {/* className='block md:hidden' */}
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#01283f] case-in-out duration-500 z-50"
            : "fixed left-[-100%] z-50"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          PROP-STAR.
        </h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600">
            <a href="/">Home</a>
          </li>

          <li className="p-4 border-b border-gray-600">
            <a href="/about">About</a>
          </li>

          <li className="p-4 border-b border-gray-600">
            <a href="/map">Map</a>
          </li>

          <li className="p-4">
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
