const defaultQueue = require('./queue');

defaultQueue.process((job, done) => {
  const { name } = job.data;

  setTimeout(() => {
    console.log(`Book name: ${name}`);
    done();
  }, 10000)
});
