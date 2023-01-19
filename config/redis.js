const IORedis = require('ioredis');

const { REDIS_URL } = process.env;

const defaultRedisClient = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

defaultRedisClient.once('error', (err) => {
  console.log(err);
});

defaultRedisClient.once('connect', () => {
  console.log('Redis Connected');
});

module.exports = defaultRedisClient;
