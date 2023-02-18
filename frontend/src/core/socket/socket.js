import { io } from 'socket.io-client';

const URL = 'http://localhost:3000';

export const socket = io(URL, { autoConnect: false });

// socket.on('users', (users) => {
//   console.log('before function4');
//   saveUsers(users);
//   console.log('after function');
// });

class Sockets {
  static connectSocket(login) {
    socket.auth = { username: login };
    socket.connect();
  }
}

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default Sockets;
