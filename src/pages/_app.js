import React from 'react';
import Head from 'next/head';

import '../styles/index.scss';

const Comp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Title</title>
        <meta property="og:title" content="" key="title" />
        <meta property="og:description" content="" key="description" />
        <meta property="og:image" content="" key="image" />
        <meta property="og:url" content="" key="url" />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:locale" content="zh_TW" key="locale" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default Comp;
