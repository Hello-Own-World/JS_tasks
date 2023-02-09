import { isAuthorised } from './auth';

export function setLocalInfo(token, userId, login) {
  localStorage.setItem('AccessToken', token);
  localStorage.setItem('UserId', userId);
  localStorage.setItem('Login', login);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('tokenExpiration', expiration.toISOString());
}

export function getLocalItem(itemName) {
  return localStorage.getItem(itemName);
}

export function getPrevLogin() {
  return isAuthorised() ? localStorage.getItem('Login') : 'Guest';
}
