import axios from 'axios';
import { axiosRequestErrorHandler } from '../errors/axiosErrors';
import AuthApi from './authApi';

class UserApi {
  static Login(inputData) {
    axios
      .post('/api/user/login', inputData, {})
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        axiosRequestErrorHandler(err);
      });
  }

  static Register(authData) {
    axios
      .post('/api/user/register', authData, {})
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        axiosRequestErrorHandler(err);
      });
  }

  static IsLoggedIn() {
    return AuthApi.getToken() && AuthApi.getLocalItem('UserId') ? true : false;
  }

  static GetUserInfo() {
    try {
      const userId = AuthApi.getLocalItem('UserId');

      axios
        .get(`/api/user/${userId}`)
        .then((resp) => {
          return resp;
        })
        .catch((err) => {
          axiosRequestErrorHandler(err);
        });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default UserApi;
