import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../core/logic/userApi';
import classes from './UserInfo.module.css';

import UserInfoForm from '../../components/forms/userInfoForm';

const UserInfo = ({ socket }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!UserApi.IsLoggedIn()) {
      return navigate('/login', { state: { notAuthorised: true } });
    }
  }, []);

  return (
    <main className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <h1>User info:</h1>
        <UserInfoForm socket={socket} />
      </div>
    </main>
  );
};

export default UserInfo;
