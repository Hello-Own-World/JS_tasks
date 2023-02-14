import { createContext } from 'react';

class AuthApi {
  static getToken() {
    try {
      const token = this.getLocalItem('AccessToken');
      if (!token) {
        throw new Error('No token provided');
      }
      const expirationTime = new Date(this.getLocalItem('tokenExpiration'));
      const now = new Date();
      if (!expirationTime || expirationTime.getTime() - now.getTime() < 0) {
        return new Error('Token expired');
      }
      return token;
    } catch (err) {
      console.error(err);
    }
  }

  static setLocalUserInfo(token, userId, login) {
    localStorage.setItem('AccessToken', token);
    localStorage.setItem('UserId', userId);
    localStorage.setItem('Login', login);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('tokenExpiration', expiration.toISOString());
  }

  static clearLocalUserInfo() {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('UserId');
    localStorage.removeItem('Login');
    localStorage.removeItem('tokenExpiration');
  }

  static getLocalItem(itemName) {
    try {
      return localStorage.getItem(itemName);
    } catch (err) {
      console.error(err);
    }
  }

  static getPrevLogin() {
    return this.getToken() ? localStorage.getItem('Login') : 'Guest';
  }
}

export default AuthApi;


