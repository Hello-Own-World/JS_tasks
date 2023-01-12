const Bull = require('bull');

const redisClient = require('./config/redis');

const defaultQueue = new Bull('default', {
  createClient: (type) => {
    switch (type) {
      case 'client':
        console.log('✔️ Connect as client to redis');
        return redisClient.duplicate();
      case 'subscriber':
        console.log('✔️ Connect as subscriber to redis');
        return redisClient.duplicate();
      default:
        console.log('✔️ Use a default redis connection');
        return redisClient;
    }
  },
}) 

module.exports = defaultQueue;