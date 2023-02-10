import { getLocalItem } from './localStorage';

export function getToken() {
  const token = getLocalItem('AccessToken');
  if (!token) {
    return null;
  }
  const expirationTime = new Date(getLocalItem('tokenExpiration'));
  const now = new Date();
  if (!expirationTime || expirationTime.getTime() - now.getTime() < 0) {
    return null;
  }
  console.log(expirationTime + 'vs' + now);
  return token;
}
