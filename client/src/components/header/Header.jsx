import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from "react-router-dom";
import './header.css'

export default function Header() {
  return (
    <header>
        <div className='estate__header'>
            <div className='estate__header-upper shadow-md back-white py-1'>
              <div className='main-container flex items-center justify-between'>
                <Link to='./'>
                  <h1 className='estate__header-upper_logo font-bold fs-40 flex justify-start'>
                    <span className='color-text'>MK</span>
                    <span className='color-text_back'>Estate</span>
                  </h1>
                </Link>
                <form className='flex items-center px-3 py-2 rounded-xl'>
                  <input type="text" placeholder='Search' className='bg-transparent focus:outline-none w-29 sm:w-64'/>
                  <FaSearch />
                </form>
                <div className='estate__header-upper_links'>
                  <Link to='./sign-in' className='fs-18 pointer'>Sign In</Link>
                  <Link to='./sign-up' className='fs-18 pointer'>Sign Up</Link>
                </div>
              </div>
            </div>
            <div className='estate__header-lower shadow-lg'>
              <div className='main-container flex items-center justify-between py-2'>
                <div className='estate__header-lower_links flex items-center justify-center flex-1'>
                  <Link to='./' className='fs-18 mx-4 pointer'>Home</Link>
                  <Link to='./about' className='fs-18 mx-4 pointer'>About</Link>
                  <Link to='./offers' className='fs-18 mx-4 pointer'>Offers</Link>
                </div>
              </div>
            </div>
        </div>
    </header>
  )
}
