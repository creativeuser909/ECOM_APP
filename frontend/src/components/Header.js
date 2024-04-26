import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom';
import { GrSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo width={90} h={50} />
          </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm'>
          <input type='text' placeholder='Search Product here...' className='w-full outline-none pl-3 border rounded-l-full h-8 focus-within:shadow'/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>
        <div className='flex gap-4 items-center justify-between mr-5'>
          <div className='text-3xl'>
            <FaUserCircle className='cursor-pointer' />
          </div>
          <div className='text-3xl relative'>
            <span>
              <IoCart className='text-4xl'/>
            </span>
            <div class='flex justify-center items-center text-sm absolute top-[-80%] left-[15%] right-0 bottom-0'>
              <p class='text-white bg-red-600 w-5 h-5 rounded-full flex justify-center items-center'>0</p>
            </div>
          </div>
        <div>
          <Link to={'/login'} className='px-2 bg-red-600 rounded-full py-1 text-white hover:bg-red-700 transition-colors duration-300 ease-in-out text-center'>Login</Link>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header