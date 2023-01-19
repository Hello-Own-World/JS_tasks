const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      require: true,
      unique: true,
    },
    pass: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

userSchema.pre(
  'save',
  async function (next) {
    try {
      const user = this;
      if (!user.isModified('pass')) next(); // checks if pass was changed to avoid double hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.pass, salt);
      this.pass = hashedPassword;
      return next();
    } catch (error) {
      return next(error);
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
