const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', msgSchema);
