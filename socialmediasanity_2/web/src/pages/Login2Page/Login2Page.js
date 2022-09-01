import { Link, Redirect, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import shareVideo from '-!file-loader!web/src/assets/share.mp4'
import logo from 'web/src/assets/EmoPic.png'
import { useScript } from "./useScript";
import jwt_decode from 'jwt-decode';
import { useEffect, useRef, useState } from "react";

// import { HomePage } from 'src\pages\HomePage\HomePage.js';

import { client } from 'src/client.js'
import { Navigate, Route, useNavigate } from "react-router-dom";
// import { Router, Route, Navigate } from '@redwoodjs/router'

const Login2Page = () => {

  const shouldRedirect = true;

  // const navigate = useNavigate();

  const googlebuttonref = useRef();
  const [user, setuser] = useState(false);
  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    let payload = jwt_decode(userCred);
    console.log('the payload is:', payload);
    console.log('the payload name is:', payload.name);
    console.log('the payload googleId is:', payload.nbf);
    console.log('the payload ImgUrl is:', payload.picture);
    setuser(payload);

    // localStorage.setItem('user', JSON.stringify(user.profilObj));
    // localStorage.setItem('user', payload);
    localStorage.setItem('user', JSON.stringify(payload));

    // const { name, googleId, imageUrl } = userCred;
    // const { name, googleId, imageUrl } = user.credential;
    // const { name, googleId, imageUrl } = payload.name;
    const name  = payload.name;
    const googleId = payload.sub;
    const imageUrl = payload.picture;


    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }

    console.log('the sanity doc inputs are:', doc)

    client.createIfNotExists(doc)
      .then(({ HomePage }) => {
            // {<Link to={routes.home()}/>}
            // <Link to={HomePage}/>
            // <HomePage />
            // <Route path="/" page={HomePage} name="home" />
            // {shouldRedirect && <Navigate replace to="/" />}
            // <Navigate to="/" />
            // navigate('/');
          })

  };

  // let profilImg = user.getImageUrl();

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: process.env.EMOPIC_APP_GOOGLE_API_TOKEN, // here's your Google ID
      callback: onGoogleSignIn,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googlebuttonref.current, {
      size: "medium",
    });

  });

  return (
    <>
      <MetaTags title="Login2" description="Login2 page" />

      {/* <h1>Login2Page</h1> */}

      <div className='flex justify-start items-center flex-col h-screen'>

      <div className='relative w-full h-full'>
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
          />
        </div>

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>

          <div className='p-5'>
            <img
              src={logo}
              alt='Logo'
              width='160px'
            />

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // height: "100vh",
            }}
          >
          {!user && <div ref={googlebuttonref}></div>}
          {user && (
            <div className='text-white'>
              <h1>{user.name}</h1>
              <img
                className="round rounded-full h-20 w-20"
                src={user.picture}
                // src={jwt_decode(user.credential).picture}
                // src="https://images.unsplash.com/photo-1661439387103-382ec41ff1aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
                // src="https://lh3.googleusercontent.com/a-/AFdZucoK3IL7FgpG8uiGNGzO5kcs_a-demfX2qLSNcSiun4=s96-c"
                alt="profile"
                width='80px'
                />
              <p>{user.email}</p>

              {/* <button
                onClick={() => {
                  <Navigate to="/" />
                }}
              >
                Go Home
              </button> */}

          <button
            onClick={() => {
              setuser(false);
            }}
          >
            Logout
          </button>
        </div>

      )

      && (
        <Redirect to="/" />
      )

      }
    </div>

        </div>



    </div>

    </>
  );
};

export default Login2Page;
