const mongoose = require('mongoose');

const { MONGODB_URI, MONGODB_DB_NAME } = process.env;

let connection;

module.exports.initConnection = (callback) => {
  if (connection) callback(null, connection);

  mongoose.connect(
    MONGODB_URI,
    {
      dbName: MONGODB_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      connection = mongoose.connection;
      console.log('DB Connected');
      callback(err, connection);
    }
  );
};
