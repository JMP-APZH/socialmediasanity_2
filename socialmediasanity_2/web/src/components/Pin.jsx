import React, { useEffect, useState } from 'react'
import { client, urlFor } from 'src/client'
import { feedQuery, userQuery } from 'src/utils/data'

// const Pin = ({ pin }) => {
// const Pin = ({ pin: {postedBy, image, _id, destination } }) => {
const Pin = ({ pin }) => {

  const [user, setUser] = useState()
  const [pins, setPins] = useState()
  const [image, setImage] = useState()


  // useEffect(() => {
  //   const query = userQuery(userInfo.googleId)

  //   client.fetch(query)
  //     .then((data) => {
  //       setUser(data[0]);
  //     })
  // }, [])

  useEffect(() => {
    // const query2 = userQuery(userInfo.googleId)

    client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setImage(data[0].image.asset.url)
        console.log('Total data:', data[0])
        console.log('data.destination:', data[0].destination)
        console.log('data.image:', data[0].image.asset.url)
        console.log('data.imageurlFor:', urlFor(image))
        const desti = data[0].destination
      })

  }, [])





  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  console.log('UserInfo from the Pin', userInfo)

  // const { postedBy, image, _id, destination } = pin;

  // const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  // console.log('UserInfo from the Pin', userInfo)
  // const { userInfo.picture } = pin;



  return (
    <div>
      Pin

    <div>
      {/* <img
            src={userInfo?.picture}
            alt="profile picture missing"
            className="w-9 h-9 rounded-full"
          />

    Image URL: {image} */}
      <img
            src={image}
            alt="user-post"
            // className="rounded-lg w-full"
            width="175"
            height={1000}
          />
      </div>

      {/* {image && ( */}
        {/* <img
        className='rounded-lg w-full' alt='user-post' src={(urlFor(userInfo?.picture).width(250).url())}
      /> */}
      {/* )} */}

      <img
        // className='rounded-lg w-64 h-64' alt='user-post' src={userInfo?.picture}
        // className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()}
        // width={250}
      />

    </div>
  )
}

export default Pin
