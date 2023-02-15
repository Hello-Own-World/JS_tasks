import React, { useContext, useEffect, useState } from 'react';
import UserApi from '../../core/logic/userApi';
import classes from './UserInfo.module.css';

import UserInfoForm from '../../components/forms/userInfoForm';

const UserInfo = () => {
  return (
    <div>
      {UserApi.IsLoggedIn() ? (
        <div>
          <h1 className={classes.h1}>User info:</h1>
          <UserInfoForm />
        </div>
      ) : (
        <div className='alert alert-warning'>
          <strong>Warning!</strong> You are logged in as Guest.{' '}
          <a href='/login' className='alert-link'>
            Log in page
          </a>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
