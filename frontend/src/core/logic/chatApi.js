import AuthApi from './authApi';
import axios from 'axios';
import { axiosRequestErrorHandler } from '../errors/axiosErrors';

class ChatApi {
  static SendMsg(inputData) {
    return axios
      .post('/api/chat/message', inputData, {
        headers: {
          Authorization: `Bearer ${AuthApi.getToken()}`,
        },
      })
      .then((resp) => resp)
      .catch((err) => {
        console.log(err)
        // axiosRequestErrorHandler(err);
      });
  }

  static GetMsg() {
    return axios
      .get(`/api/chat`, { headers: { Authorization: `Bearer ${AuthApi.getToken()}` } })
      .then((resp) => resp)
      .catch((err) => {
        axiosRequestErrorHandler(err);
      });
  }
}

export default ChatApi;
