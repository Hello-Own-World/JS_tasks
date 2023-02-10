import { getToken } from './auth';

export function setLocalUserInfo(token, userId, login) {
  localStorage.setItem('AccessToken', token);
  localStorage.setItem('UserId', userId);
  localStorage.setItem('Login', login);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('tokenExpiration', expiration.toISOString());
}

export function clearLocalUserInfo() {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('UserId');
  localStorage.removeItem('Login');
  localStorage.removeItem('tokenExpiration');
}

export function getLocalItem(itemName) {
  return localStorage.getItem(itemName);
}

export function getPrevLogin() {
  return getToken() ? localStorage.getItem('Login') : 'Guest';
}
