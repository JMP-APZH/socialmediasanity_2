import { Link, routes, Router, Route } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

import shareVideo from '-!file-loader!web/src/assets/share.mp4'
import { useEffect, useState, useRef } from "react";
import { useScript } from "../Login2Page/useScript";

import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
// import { Link, Route, Routes } from 'react-router-dom';

import { Feed, Sidebar, UserProfile } from "src/components";
import Pins from "src/container/Pins";

import { userQuery } from "src/utils/data";

import { client } from 'src/client.js';
import logo from 'web/src/assets/EmoPic.png';
import Navbar from "src/components/Navbar";
import Pin from "src/components/Pin";
// import { Route, Router, Routes, Link } from "react-router-dom";

const HomePage = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);

  const [user, setUser] = useState(null)

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  console.log('userInfo from the HomePage:', userInfo);

  const scrollRef = useRef(null)

  useEffect(() => {
    const query = userQuery(userInfo.googleId)

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  // if (!user) return null;

  return (
    <>

    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={userInfo && userInfo} />
      </div>
      <div className="flex md:hidden flex-row">

        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToggleSidebar(true)}
        />
        <Link
          to="/"
        >
          <img
            src={logo}
            alt="logo"
            className="w-28"
          />
        </Link>

        <Link
          to={`user-profile/${user?._id}`}
        >
          <img
            src={userInfo?.picture}
            alt="profile picture missing"
            className="w-9 h-9 rounded-full"
          />
        </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />
          </div>
          <Sidebar user={userInfo && userInfo} closeToggle={setToggleSidebar} />
        </div>
      )}
      </div>

      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >

{/* Here should be some routes */}
      {/* <Pins
        user={userInfo && userInfo}
      /> */}

      {/* <Feed /> */}

      {/* Navbar not in the HomePage component in the tutorial */}
      <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={userInfo && userInfo}
      />

      <Pin />

        {/* <Router> */}
            {/* <Route */}
              {/* path="/user-profile/:userId" */}
              {/* page={<UserProfile />} */}
              {/* name='userprofileid' */}
            {/* /> */}
            {/* <Route */}
              {/* path="/*" */}
              {/* element={<Pins user={user && user} />} */}
              {/* name='pins' */}
            {/* /> */}
        {/* </Router> */}


        {/* <Routes> */}
          {/* <Route path="/user-profile/:userId" element={<UserProfile />} /> */}
          {/* <Route path="/*" element={<Pins user={user && user} />} /> */}
        {/* </Routes> */}

      </div>

    </div>

    </>
  );
};

export default HomePage;
