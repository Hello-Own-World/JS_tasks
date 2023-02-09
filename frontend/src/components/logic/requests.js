import axios from 'axios';

export async function tryLogin(inputData) {
  const resp = await axios.post('/api/user/login', inputData, {});
  return resp;
}

export async function tryRegister(authData) {
  const resp = await axios.post('/api/user/register', authData, {});
  return resp;
}

export async function trySendMsg(inputData, token) {
  const resp = await axios.post('/api/chat/message', inputData, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return resp;
}

export async function tryGetMsg(token) {
  const resp = await axios.get(`/api/chat`, { headers: { Authorization: `Bearer ${token}` } });
  return resp;
}

export async function tryGetUserInfo(userId) {
  const resp = await axios.get(`/api/user/${userId}`);
  return resp;
}
