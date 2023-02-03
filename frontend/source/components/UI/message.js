import React from 'react';

import Card from './Card';
import Button from './Button';

import classes from './message.module.css';

const Message = (props) => {
  return (
    <Card>
      <h3>Name: {props.username}</h3>
      <p>Msg: {props.message}</p>
      <p>Time: {props.time}</p>
    </Card>
  );
};

export default Message;
