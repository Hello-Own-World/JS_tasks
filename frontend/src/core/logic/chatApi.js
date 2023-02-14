import AuthApi from './authApi';
import axios from 'axios';

class ChatApi {
  static SendMsg(inputData) {
    try {
      const token = AuthApi.getToken();
      return axios.post('/api/chat/message', inputData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  static GetMsg() {
    try {
      const token = AuthApi.getToken();
      return axios.get(`/api/chat`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error(err);
    }
  }
}

export default ChatApi;
