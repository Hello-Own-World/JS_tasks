class AuthApi {
  /** Get token from local storage, if it is absent or expired return null*/
  static getToken() {
    try {
      const token = this.getLocalItem('AccessToken');
      if (!token) {
        throw new Error('Token not provided');
      }
      const expirationTime = new Date(this.getLocalItem('tokenExpiration'));
      const now = new Date();
      if (!expirationTime || expirationTime.getTime() - now.getTime() < 0) {
        throw new Error('Token expired');
      }
      return token;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static setLocalUserInfo(token, userId, login) {
    try {
      localStorage.setItem('AccessToken', token);
      localStorage.setItem('UserId', userId);
      localStorage.setItem('Login', login);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem('tokenExpiration', expiration.toISOString());
    } catch (err) {
      console.error(err);
    }
  }

  static clearLocalUserInfo() {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('UserId');
    localStorage.removeItem('Login');
    localStorage.removeItem('tokenExpiration');
  }
  /** Returns item from local storage or throws error if there is none*/
  static getLocalItem(itemName) {
    try {
      const item = localStorage.getItem(itemName);
      if (!item) {
        throw new Error(`No ${itemName} provided`);
      }
      return item;
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  static getPrevLogin() {
    return this.getToken() ? localStorage.getItem('Login') : 'Guest';
  }
}

export default AuthApi;
