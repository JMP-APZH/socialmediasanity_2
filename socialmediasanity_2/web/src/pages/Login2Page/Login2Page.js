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
            <div>
              <h1>{user.name}</h1>
              <img src={user.picture} alt="profile" />
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
