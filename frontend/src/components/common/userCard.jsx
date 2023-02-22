import React from 'react';
import Card from './card';
import classes from './userCard.module.css';

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
    <Card key={props.id}>
      <h5 className={classes.nickname}>
        {props.username} {displayStatus(props.status)}
      </h5>
    </Card>
  );
};

export default UserCard;
