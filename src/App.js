import React from "react";
import axios from "axios";

import Navbar from "./components/common/Navbar";
import Hero from "./components/screens/Hero";
import Footer from "./components/common/Footer";
import Login from "./components/screens/Login";
import About from "./components/screens/About";
import Filler from "./components/screens/Filler";
import Map from "./components/screens/Map";
import Register from "./components/screens/Register";
import ForgotPwd from "./components/screens/ForgotPwd";
import { Routes, Route } from "react-router-dom";
import EmailVerification from "./components/screens/EmailVerification";
import Dashboard from "./components/screens/Dashboard";
import Create from "./components/screens/Create";

function App() {
  //axios.defaults.baseURL = "https://prop-star.kessaft.com/";
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Filler />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPwd" element={<ForgotPwd />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
