import React from "react";

import loginImg from "../../assets/login.jpg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function VertificationPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-white p-4">
          <h2 className="text-4xl font-bold text-center py-6">PROP-STAR.</h2>
          <div className="flex flex-col py-2">
            <label>Code</label>
            <input className="border p-2" type="text" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to="/register"
              className="button"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <FaArrowLeft size={20} />
              Back to Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
