const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/user');

const { SECRET_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return next(createError(400, 'Missing token'));
    }

    const { user_id: userId } = jwt.verify(token, SECRET_KEY);
    req.user = await User.findById(userId);
  } catch {
    return next(createError(401, 'Invalid Token'));
  }
  return next();
};

module.exports = verifyToken;
