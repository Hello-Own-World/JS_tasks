import axios from 'axios';
import AuthApi from './authApi';

class UserApi {
  static Login(inputData) {
    return axios.post('/api/user/login', inputData, {});
  }

  static Register(authData) {
    return axios.post('/api/user/register', authData, {});
  }

  static IsLoggedIn() {
    return AuthApi.getToken() && AuthApi.getLocalItem('UserId') ? true : false;
  }

  static GetUserInfo() {
    try {
      const userId = AuthApi.getLocalItem('UserId');
      if (!userId) {
        throw new Error('No user Id provided');
      }
      return axios.get(`/api/user/${userId}`);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default UserApi;
