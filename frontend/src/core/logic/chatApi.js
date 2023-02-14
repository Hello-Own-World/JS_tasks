import AuthApi from './authApi';
import axios from 'axios';
import { axiosRequestErrorHandler } from '../errors/axiosErrors';

class ChatApi {
  static SendMsg(inputData) {
    axios
      .post('/api/chat/message', inputData, {
        headers: {
          Authorization: `Bearer ${AuthApi.getToken()}`,
        },
      })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        axiosRequestErrorHandler(err);
      });
  }

  static GetMsg() {
    axios
      .get(`/api/chat`, { headers: { Authorization: `Bearer ${AuthApi.getToken()}` } })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        axiosRequestErrorHandler(err);
      });
  }
}

export default ChatApi;
