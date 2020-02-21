import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from 'js/routes';

function Home() {
  return (
    <>
      <h2>Home</h2>
      <Link to={paths.sets}>
        Sets
      </Link>
    </>
  );
}

export default Home;
