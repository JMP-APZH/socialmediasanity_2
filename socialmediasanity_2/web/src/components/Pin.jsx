import React, { useEffect, useState } from 'react';
import { client, urlFor } from 'src/client';
import { feedQuery, userQuery } from 'src/utils/data';
import { Link, NavLink, Redirect, Route, routes } from '@redwoodjs/router';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import Login2Page from 'src/pages/Login2Page/Login2Page';
import { fetchUser } from 'src/utils/fetchUser';


// const Pin = ({ pin }) => {
// const Pin = ({ pin: {postedBy, image, _id, destination } }) => {
const Pin = () => {

  const [user, setUser] = useState()
  const [pin, setPin] = useState()
  const [image, setImage] = useState()
  const [pinId, setPinId] = useState()
  // const image = "https://cdn.sanity.io/images/ofswpzzi/production/badb62184d59b9c926f4303acc3b624ec88cf422-4000x6000.jpg"



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
        setPin(data[0]);
        setImage(data[0].image.asset.url)
        // const image = data[0].image.asset.url
        // setImage("https://cdn.sanity.io/images/ofswpzzi/production/badb62184d59b9c926f4303acc3b624ec88cf422-4000x6000.jpg")
        // const image = String(data[0].image.asset.url.toString)
        setPinId(data[0]._id)
        console.log('Total data:', data[0])
        console.log('data.destination:', data[0].destination)
        console.log('data.image:', data[0].image.asset.url)
        console.log('data.image2:', data[0].image.asset)
        console.log('data.imageurlFor:', urlFor(image))
        console.log('_id is here:', data[0]._id)
        const desti = data[0].destination
      })

  }, [])





  // const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const userInfo = fetchUser();
  console.log('UserInfo from the Pin', userInfo)

  const alreadySaved = !!(pin?.save?.filter((item) => item.postedBy._id === user.googleId))?.length;

  const savePin = (id) => {
    if(!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user.googleId
          }
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        })
    }
  }

  // console.log(save);
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


      {pinId && {image} && (
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


          {postHovered && {image} && (
            <div
              className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
              style={{ height: '100%' }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                  <a
                    // href={`${image?.asset?.url}?dl=`}
                    href={`${image}?dl=`}
                    // href={data[0].image?.asset?.url?dl=}
                    // href={`${"https://cdn.sanity.io/images/ofswpzzi/production/badb62184d59b9c926f4303acc3b624ec88cf422-4000x6000.jpg"}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white w-9 h-9 rounded-full flex items-center
                                  justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>
                {alreadySaved ? (
                  <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
                    {save?.length} Saved
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
                    Save
                  </button>
                )
                }
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
