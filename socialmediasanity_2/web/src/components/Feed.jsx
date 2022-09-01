import React, { useEffect, useState } from 'react';
import { useParams } from '@redwoodjs/router';

import { client } from 'src/client.js';

import MasonryLayout from './MasonryLayout.jsx';
import Spinner from './Spinner.jsx';
import { feedQuery, searchQuery } from 'src/utils/data.js';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if(categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false)
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    }
  }, [categoryId])



  if (loading) {
    return (
      <Spinner message='we are adding new ideas to your feed!' />
    );
  }

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed
