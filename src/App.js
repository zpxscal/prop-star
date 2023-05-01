import React from "react";
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

function App() {
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
