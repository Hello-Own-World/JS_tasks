import React from 'react';
import Button from '../common/button';
import Card from '../common/card';
import classes from './sendMsgForm.module.css';

import { useState } from 'react';
import ChatApi from '../../core/logic/chatApi';

const SendMsgForm = ({ socket }) => {
  const [msg, setMsg] = useState('');

  const msgInputHandler = (event) => {
    setMsg(event.target.value);
  };

  function msgSubmitHandler(event) {
    event.preventDefault();
    if (msg.trim().length === 0) {
      event.preventDefault();
      return;
    }

    const inputData = {
      body: msg,
    };

    console.log(inputData);

    ChatApi.SendMsg(inputData)
      .then((data) => {
        // after we got response that message was saved in DB
        console.log('data ' + data);

        for (const prop in data.data) {
          console.log('prop in data.data ' + prop);
        }

        const msg = data.data;
        socket.emit('Send message', msg);
        console.log('EMIT SEND MESSAGE');
      })
      .catch((error) => console.log(error));

    setMsg('');
  }

  return (
    <Card className={classes.input}>
      <form onSubmit={msgSubmitHandler}>
        <textarea onChange={msgInputHandler} value={msg} type='text' name='body' className='form-control'></textarea>
        <br />
        <Button type='submit'>Send</Button>
      </form>
    </Card>
  );
};

export default SendMsgForm;
