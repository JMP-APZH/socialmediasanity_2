import React, { useEffect, useState } from 'react';
import { useParams } from '@redwoodjs/router';

import { client } from 'src/client.js';

import MasonryLayout from './MasonryLayout.jsx';
import Spinner from './Spinner.jsx';

const Feed = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Spinner message='we are adding new ideas to your feed!' />
    );
  }

  return (
    <div>Feed</div>
  )
}

export default Feed
