import React from 'react'
import Typed from 'react-typed';
import {Link} from 'react-router-dom';

const Hero = () => {
  return (
    <div className='text-white'>

        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>GET YOUR PROPERTY WITH PROP-STAR</h1>
        <div className='föex justify-center items-center'>
            <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Fast, trusted, low provison</p>
            <Typed className='md:text-3xl sm:text-4xl text-xl font-bold pl-2' strings={['PROP-STAR']} typeSpeed={120} backSpeed={140} loop/>
        </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'> <Link to="/map" className="button">GET STARTED</Link></button>
        </div>

    </div>
  )
}

export default Hero