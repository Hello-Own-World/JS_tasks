import React from 'react';

const WarningMsg = () => {
  return (
    <div className='alert alert-warning'>
      <strong>Error!</strong> You have to be logged in to access global chat.{' '}
      <a href='/login' className='alert-link'>
        Log in page
      </a>
    </div>
  );
};

export default WarningMsg;
