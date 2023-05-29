import React from 'react';
import Card from './card';
import classes from './message.module.css';

const Message = (props) => {
  return (
    <div>
      <div className={classes.messageBox} key={props.id}>
        <h2>{props.username}</h2>
        <p dangerouslySetInnerHTML={{ __html: props.message }}></p>
        <p className={classes.time}>{props.time}</p>
      </div>

      {/* <Card key={props.id}>
        <h3 className={classes.nickname}>{props.username}</h3>
        <p className={classes.body} dangerouslySetInnerHTML={{ __html: props.message }}></p>
        <p className={classes.time}>{props.time}</p>
      </Card> */}
    </div>
  );
};

export default Message;
