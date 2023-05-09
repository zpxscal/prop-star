import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/whoami").catch((error) => {
      //console.log(error);
      navigate("/login");
    });
  }, []);

  const handleLogout = () => {
    axios
      .post("/api/auth/logout")
      .then((res) => navigate("/login"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      type="button"
      className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Dashboard;
