import React from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Login from './components/Login';
import About from './components/About';
import Filler from './components/Filler';
import Map from './components/Map';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Hero></Hero>}/>
        <Route path='/about' element={<About></About>}/>
        <Route path='/search' element={<Filler></Filler>}/>
        <Route path='/map' element={<Map></Map>}/>
        <Route path='/login' element={<Login></Login>}/>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
