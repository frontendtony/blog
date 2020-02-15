import Head from 'next/head';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Blog | Frontend Tony</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mb-20">
        <h1 className="blog-title text-4xl">Welcome to my Blog</h1>
        <p className="date-and-duration">October 25, 2019, 6 min read</p>
      </div>
    </div>
  );
};

export default Home;
