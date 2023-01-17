const defaultQueue = require('./queue');

defaultQueue.process((job, done) => {
  const { title } = job.data;

  setTimeout(() => {
    console.log(`Book name: ${title}`);
    done();
  }, 1000)
});
