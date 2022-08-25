import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import GoogleLogin from 'react-google-login'
// import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '-!file-loader!web/src/assets/share.mp4'
import logo from 'web/src/assets/EmoPic.png'
// import "node_modules/video-react/dist/video-react.css";
// import { Player } from 'video-react';

import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

// import { client } from 'src/client.js'

const LoginPage = () => {

  // const navigate = useNavigate();

  const { user, setUser } = useState({})

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token' + response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "581293899491-0u3g38kbo1j7llcnhvksqms80gaobuhf.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }, []);

  // const responseGoogle= (response) => {
  //   console.log(response.profileObj)
  //   console.log(response)
  //   console.log('hello from LoginPage')
  //   localStorage.setItem('user', JSON.stringify(response.profilObj));

  //   const { name, googleId, imageUrl } = response.profileObj;

  //   const doc = {
  //     _id: googleId,
  //     _type: 'user',
  //     userName: name,
  //     image: imageUrl,
  //   }

  //   client.createIfNotExists(doc).then(() => {
  //       // navigate('/', { replace: true });
  //       <Link to={routes.home()}/>
  //     })
  // }

  // if we have no user: show sign in Btn
  // if we have a user: show logout Btn

  return (
    <>
      <MetaTags title="Login" description="Login page" />

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
              // src='https://looka.com/s/95180320'
              // src='https://images.unsplash.com/photo-1555596899-d634257b55bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
              alt='Logo'
              width='160px'
            />

          </div>

          {/* <div className='shadow-2xl'> */}
            {/* <GoogleLogin
              clientId={`${process.env.EMOPIC_APP_GOOGLE_API_TOKEN}`}
              // clientId={`${581293899491-0u3g38kbo1j7llcnhvksqms80gaobuhf.apps.googleusercontent.com}`}
              // render={(renderProps) => (
              //   <button
              //     type='button'
              //     className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              //     onClick={renderProps.onClick}
              //     disabled={renderProps.disabled}
              //   >
              //     <FcGoogle className='mr-4' />
              //       Sign in with Google
              //   </button>
              // )}
              buttonText='Login'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            /> */}

            <div id='signInDiv'></div>

            {/* { Object.keys(user).length != 0 &&
              <button
                onClick={(e) => handleSignOut(e)}
              >
                Sign Out
              </button>
            } */}



            <div>
             { user &&
                <div>
                  <img src={user.picture}></img>
                  <h3>{user.name}</h3>
                </div>
              }
            </div>




            {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}

          {/* </div> */}

        </div>



      </div>
      {/* <p
        // className='text-3xl font-bold underline'
      >
        My default route is named <code>login</code>, link to me with `
        <Link to={routes.login()}>Login</Link>`
      </p> */}
  </>
  )
}

export default LoginPage
