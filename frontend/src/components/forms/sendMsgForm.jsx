import React from 'react';
import Button from '../common/button';
import Card from '../common/card';
import classes from './sendMsgForm.module.css';

import { useState } from 'react';
import ChatApi from '../../core/logic/chatApi';

const SendMsgForm = ({ setResponse }) => {
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

    setMsg('');

    console.log(inputData);

    ChatApi.SendMsg(inputData)
      .then((data) => {
        console.log('Successful delivery' + data.status);
      })
      .catch((error) => console.log(error));

    ChatApi.GetMsg()
      .then((resp) => {
        setResponse(resp.data);
      })
      .catch((err) => console.log(err));
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
