import React from 'react'
import Casino from '../assets/bild1.png'
import {Link} from 'react-router-dom';

function About() {
  return (
    <div className='w-full bg-white py-16 px-4'>

        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img className='w-[400px] mx-auto my-4' src={Casino} alt="/"></img>

            <div className='flex flex-col justify-center'>
                <h1 className='md:text-xl sm:text-3xl text-2xl font-bold py-2'>What is Prop-Star?</h1>
                <p>Prop-Star is an online real estate platform that provides a comprehensive and reliable source of information for anyone looking to buy or rent a property. You can filter your search results by location, property type, price range, and many other criteria, which ensures that you only see properties that match your needs. Additionally, Prop-Star is committed to providing a seamless and transparent experience for its users. The platform provides detailed information about each property, including high-quality photos, floor plans, and descriptions, which allows you to make an informed decision before you even visit the property.</p>
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'> <Link to="/map" className="button">GET STARTED</Link></button>
            </div>

        </div>

    </div>
  )
}

export default About