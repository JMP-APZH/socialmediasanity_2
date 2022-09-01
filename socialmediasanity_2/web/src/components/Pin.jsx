import React from 'react'
import { urlFor } from 'src/client'

const Pin = ({ pin }) => {

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  console.log('UserInfo from the Pin', userInfo)
  // const { userInfo.picture } = pin;

  return (
    <div>
      Pin
      {/* {image && ( */}
        {/* <img
        className='rounded-lg w-full' alt='user-post' src={(urlFor(userInfo?.picture).width(250).url())}
      /> */}
      {/* )} */}

      <img
        className='rounded-lg w-64 h-64' alt='user-post' src={userInfo?.picture}
        // width={250}
      />

    </div>
  )
}

export default Pin
