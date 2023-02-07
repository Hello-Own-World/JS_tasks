export function isAuthorised() {
  const token = localStorage.getItem('AccessToken');
  if (!token) {
    return null;
  }
  const expirationTime = new Date(localStorage.getItem('tokenExpiration'));
  const now = new Date();
  if (!expirationTime || expirationTime.getTime() - now.getTime() < 0) {
    return null;
  }
  console.log(expirationTime + 'vs' + now);
  return token;
}
