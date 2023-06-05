import React from 'react';
import classes from './userCard.css';

const UserCard = (props) => {
  function displayStatus(status) {
    if (status === 'Online') {
      return <span className='badge rounded-pill bg-success'>Online</span>;
    } else if (status === 'Away') {
      return <span className='badge rounded-pill bg-warning'>Away</span>;
    } else {
      console.log(status);
      return null;
    }
  }

  return (
    <div id='userCard'>
      <div className={classes.userBox} key={props.id}>
        <div className={classes.imageContainerSmall}></div>
        {props.username}
        <span className={props.status === 'Online' ? classes.badge : classes.badgeWarn}>{props.status}</span>
      </div>
    </div>
  );
};

export default UserCard;
