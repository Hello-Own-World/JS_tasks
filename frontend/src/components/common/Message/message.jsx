import React from 'react';
import classes from './message.css';

const Message = (props) => {
  return (
    <div className={classes.messageBox} key={props.id}>
      <h2>{props.username}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.message }}></p>
      <p className={classes.time}>{props.time}</p>
    </div>
  );
};

export default Message;
