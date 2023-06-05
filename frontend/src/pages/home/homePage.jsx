import React from 'react';

import classes from './HomePage.css';

const Home = () => {
  return (
    <main className={classes.wrapper}>
      <section className={classes.about}>
        <h1 id='heading'>About Chat App</h1>
        <p id='aboutSection'>
          Chat App is a modern and easy-to-use chat application that allows you to connect with people around the world.
          With Chat App, you can easily chat with your friends, family, or colleagues, share files, and stay connected
          wherever you are.
        </p>
      </section>
    </main>
  );
};

export default Home;
