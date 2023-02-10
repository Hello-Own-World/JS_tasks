import React from 'react';
import Card from './card';
import classes from './message.module.css';

const Message = (props) => {
  return (
    <Card key={props.id}>
      <h3 className={classes.nickname}>{props.username}</h3>
      <p className={classes.body}>{props.message}</p>
      <p className={classes.time}>{props.time}</p>
    </Card>
  );
};

export default Message;
