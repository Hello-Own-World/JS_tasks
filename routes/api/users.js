const express = require('express');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { checkPass } = require('../../modules/passManager');
const { userSchema } = require('../../modules/schemas');
const { auth, validate } = require('../../middleware');
const User = require('../../models/user');

const router = express.Router();

// Register
router.post('/register', validate(userSchema.regBodyPost, 'body'), async (req, res, next) => {
  try {
    const userData = req.body;
    userData.login = userData.login.toLowerCase();
    const foundUser = await User.findOne({ login: userData.login });
    if (foundUser) {
      next(createError(400, 'User with such login already exists'));
      return;
    }

    await User.create(userData);

    res.status(200).json({ msg: 'User successfully created' });
  } catch {
    next(createError(500, 'Error occurred while creating user in DB'));
  }
});

// Login
router.post('/login', validate(userSchema.logBodyPost, 'body'), async (req, res, next) => {
  const { login, pass } = req.body;

  const user = await User.findOne({ login });

  if (user && (await checkPass(pass, user.pass))) {
    const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, userId: user.id, login: user.login });
  } else {
    next(createError(400, 'Wrong input'));
  }
});

// Get particular user (public)
router.get('/:id', [validate(userSchema.paramDelPut, 'params')], async (req, res, next) => {
  try {
    const { id } = req.params;

    const userExists = await User.findOne({ _id: id });

    if (!userExists) {
      next(createError(400, `User is not in the DB`));
      return;
    }

    userExists.pass = undefined;
    res.status(200).send(userExists);
  } catch {
    next(createError(500, 'Error occurred while getting user info from DB'));
  }
});

// PUT particular user
router.put(
  '/:id',
  [validate(userSchema.bodyPut, 'body'), validate(userSchema.paramDelPut, 'validate'), auth],
  async (req, res, next) => {
    const { id } = req.params;

    const userExists = await User.findOne({ _id: id });

    if (!userExists) {
      next(createError(400, `User is not in the DB`));
      return;
    }

    if (String(userExists.id) === String(req.user.id)) {
      try {
        Object.keys(req.body).forEach((key) => {
          userExists[key] = req.body[key];
        });

        await userExists.save();

        res.status(200).send(userExists);
      } catch (err) {
        next(createError(500, 'Error occurred while updating user info in DB'));
      }
    } else {
      next(createError(403, 'Forbidden action'));
    }
  }
);

// Delete user
router.delete('/:id', [validate(userSchema.paramDelPut, 'params'), auth], async (req, res, next) => {
  const { id } = req.params;

  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    next(createError(400, `User is not in the DB`));
    return;
  }

  if (String(userExists.id) === String(req.user.id)) {
    try {
      await User.deleteOne({ id });
      res.status(200).json({ msg: `Successful deletion of user: ${userExists.login}` });
    } catch {
      next(createError(500, 'Error occurred while deleting the user from DB'));
    }
  } else {
    next(createError(403, 'Forbidden action'));
  }
});

module.exports = router;
