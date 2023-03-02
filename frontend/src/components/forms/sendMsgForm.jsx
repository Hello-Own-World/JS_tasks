import React from 'react';
import Button from '../common/button';
import Card from '../common/card';
import classes from './sendMsgForm.module.css';

import { useState } from 'react';
import ChatApi from '../../core/logic/chatApi';
import { addMsg } from '../../core/logic/socketManager';

const SendMsgForm = ({ socket, setMessages }) => {
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

    ChatApi.SendMsg(inputData).catch((error) => console.log(error));

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
