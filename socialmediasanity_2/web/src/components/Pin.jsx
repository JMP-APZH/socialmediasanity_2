import React, { useEffect, useState } from 'react';
import { client, urlFor } from 'src/client';
import { feedQuery, userQuery } from 'src/utils/data';
import { Link, NavLink, Redirect, Route, routes } from '@redwoodjs/router';
import { va as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import Login2Page from 'src/pages/Login2Page/Login2Page';


// const Pin = ({ pin }) => {
// const Pin = ({ pin: {postedBy, image, _id, destination } }) => {
const Pin = ({ pin }) => {

  const [user, setUser] = useState()
  const [pins, setPins] = useState()
  const [image, setImage] = useState()
  const [pinId, setPinId] = useState()


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
        setPinId(data[0]._id)
        console.log('Total data:', data[0])
        console.log('data.destination:', data[0].destination)
        console.log('data.image:', data[0].image.asset.url)
        console.log('data.imageurlFor:', urlFor(image))
        console.log('_id is here:', data[0]._id)
        const desti = data[0].destination
      })

  }, [])





  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  console.log('UserInfo from the Pin', userInfo)

  // const { postedBy, image, _id, destination } = pin;

  // const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  // console.log('UserInfo from the Pin', userInfo)
  // const { userInfo.picture } = pin;

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  // const navigateLogin2 = () => {
  //   // <Redirect to="/login2" />
  //   routes.login2()
  // };

  return (
    <div className='m-2 w-52'>
      {/* Pin */}
      {/* Image URL: {image} */}

      {pinId && (
        <Link
            to={routes.pindetail({ id: pinId })}
            className='font-bold'
          >
        <div
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          className='relative hover:shadow-lg rounded-lg overflow-hidden transition-all
                      duration-500 ease-in-out'
        >


            <img
            src={image}
            alt="user-post"
            // className="rounded-lg w-full"
            width="200"
          />


          {postHovered && (
            <div
              className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
              style={{ height: '100%' }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                  <a
                    href={`${image?.asset?.url}?dl`}
                    download
                    onClick={(e) => stopPropagation()}
                    className='bg-white w-9 h-9 rounded-full flex items-center
                                  justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>

              </div>

            </div>
            )}

      </div>
      </Link>
      )}




      {/* <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        className='relative w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all
                    duration-500 ease-in-out'
      >
      <Link
        to={routes.login2()}
        className='absolute font-bold z-50 flex flex-col right-0'
      >
        Click Here
        <img
        src={image}
        alt="user-post"
        // className="rounded-lg w-full"
        width="200"
      />
      </Link>
      <img
        src={image}
        alt="user-post"
        // className="rounded-lg w-full"
        width="200"
      />
      {postHovered && (
        <div
          className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
          style={{ height: '100%' }}
        >
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <a
                href={`${image?.asset?.url}?dl`}
                download
                onClick={(e) => stopPropagation()}
                className='bg-white w-9 h-9 rounded-full flex items-center
                              justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <MdDownloadForOffline />
              </a>
            </div>

          </div>

        </div>
      )}

      </div> */}

    {/* <div>
      <img
        src={image}
        alt="user-post"
        // className="rounded-lg w-full"
        width="200"
      />
      </div> */}



    </div>
  )
}

export default Pin
