import React from 'react';
import { NavLink, Link } from "@redwoodjs/router";
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from 'web/src/assets/EmoPic.png';

const Sidebar = ({ user, userInfo, closeToggle }) => {

  const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
  const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

  console.log('user from the sidebar:', user)
  console.log('userInfo from the sidebar:', userInfo)

  const categories = [
    { name: 'Animals' },
    { name:  'Wallpapers'},
    { name: 'Photography' },
    { name: 'Gaming' },
    { name: 'Coding' },
    { name: 'Others' },
  ]

  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to="/"
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img
            src={logo}
            alt="logo"
            className='w-full'
          />

        </Link>

        <div className='flex flex-col gap-3'>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
          <div className='font-bold flex flex-row items-center'>
            <div className='px-2'>
            <RiHomeFill />
            </div>
            <div className=''>
              Home
            </div>
          </div>
          </NavLink>

          {/* <div> */}
            <h3  className='pl-2 mt-2 text-base 2xl:text-xl'>
              Discover Categories
            </h3>
            <div className='flex flex-col gap-3 pl-2'>
            {categories.slice(0, categories.length - 1).map((category) => (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                onClick={handleCloseSidebar}
                key={category.name}
              >
                {category.name}
              </NavLink>
            ))}
            </div>
            {/* </div> */}
        </div>
      </div>
      { user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={handleCloseSidebar}
        >
          <img src={user.picture} className='w-10 h-10 rounded-full' alt='user profile' />
          <p>{user.name}</p>
        </Link>
      ) }
    </div>
  )
}

export default Sidebar
