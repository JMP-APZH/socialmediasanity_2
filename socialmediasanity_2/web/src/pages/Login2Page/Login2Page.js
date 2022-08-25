import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import shareVideo from '-!file-loader!web/src/assets/share.mp4'
import logo from 'web/src/assets/EmoPic.png'
import { useScript } from "./useScript";
import jwt_deocde from "jwt-decode";
import { useEffect, useRef, useState } from "react";


const Login2Page = () => {

  const googlebuttonref = useRef();
  const [user, setuser] = useState(false);
  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    let payload = jwt_deocde(userCred);
    console.log(payload);
    setuser(payload);

  };

  // let profilImg = user.getImageUrl();

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: process.env.EMOPIC_APP_GOOGLE_API_TOKEN, // here's your Google ID
      callback: onGoogleSignIn,
      auto_select: false,
    });

    // function onSignIn(user) {
    //   var profile = user.getBasicProfile();
    //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //   console.log('Name: ' + profile.getName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // }

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
                // src={`${user.picture}`}
                src="https://images.unsplash.com/photo-1661439387103-382ec41ff1aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
                // src="https://lh3.googleusercontent.com/a-/AFdZucoK3IL7FgpG8uiGNGzO5kcs_a-demfX2qLSNcSiun4=s96-c"
                alt="profile"
                width='80px'
                />
              <p>{user.email}</p>

          <button
            onClick={() => {
              setuser(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>

        </div>



    </div>

    </>
  );
};

export default Login2Page;
