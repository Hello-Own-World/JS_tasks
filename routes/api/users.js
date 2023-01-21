const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const User = require('../../models/user');
const { userSchema } = require('../../modules');
const { auth, validateBody, validateParams } = require('../../middleware');

const router = express.Router();

// Register
router.post(
  '/register',
  validateBody(userSchema.regBodyPost),
  async (req, res, next) => {
    const userData = req.body;
    try {
      userData.login = userData.login.toLowerCase();
      const foundUser = await User.findOne({ login: userData.login });
      if (foundUser) {
        next(createError(400, 'User with such login already exists'));
        return;
      }
      const user = new User(userData);
      await user.save();
      res.status(200).json({ msg: 'User successfuly created' });
    } catch {
      next(createError(500, 'Error occured while creating user in DB'));
    }
  }
);

// Login
router.post(
  '/login',
  validateBody(userSchema.logBodyPost),
  async (req, res, next) => {
    const { login, pass } = req.body;

    const user = await User.findOne({ login });

    if (user && (await bcrypt.compare(pass, user.pass))) {
      const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } else {
      next(createError(400, 'Wrong input'));
    }
  }
);

// Get particular user (public)
router.get(
  '/:id',
  [validateParams(userSchema.paramDelPut), auth],
  async (req, res, next) => {
    const { id } = req.params;

    const userExists = await User.findOne({ _id: id });

    if (!userExists) {
      next(createError(400, `User is not in the DB`));
      return;
    }

    try {
      userExists.pass = undefined;
      res.status(200).send(userExists);
    } catch {
      next(createError(500, 'Error occured while getting user info from DB'));
    }
  }
);

// PUT particular user
router.put(
  '/:id',
  [
    validateBody(userSchema.bodyPut),
    validateParams(userSchema.paramDelPut),
    auth,
  ],
  async (req, res, next) => {
    const { pass, firstName, lastName, phone } = req.body;
    const { id } = req.params;

    const userExists = await User.findOne({ _id: id });

    if (!userExists) {
      next(createError(400, `User is not in the DB`));
      return;
    }

    if (String(userExists.id) === String(req.user.id)) {
      try {
        // Object.keys(bodyData).forEach(key => {
        //    userExists[key] = bodyData[key]
        // })
        if (firstName) {
          userExists.firstName = firstName;
        }
        if (lastName) {
          userExists.lastName = lastName;
        }
        if (phone) {
          userExists.phone = phone;
        }
        if (pass) {
          // not sure about allowing this action
          userExists.pass = pass;
        }

        await userExists.save();
        res.status(200).send(userExists);
      } catch (err) {
        next(createError(500, 'Error occured while updating user info in DB'));
      }
    } else {
      next(createError(403, 'Forbidden action'));
    }
  }
);

// Delete user
router.delete(
  '/:id',
  [validateParams(userSchema.paramDelPut), auth],
  async (req, res, next) => {
    const { id } = req.params;

    const userExists = await User.findOne({ _id: id });

    if (!userExists) {
      next(createError(400, `User is not in the DB`));
      return;
    }

    if (String(userExists.id) === String(req.user.id)) {
      try {
        await User.deleteOne({ id });
        res
          .status(200)
          .json({ msg: `Successful deletion of user: ${userExists.login}` });
      } catch {
        next(createError(500, 'Error occured while deleting the user from DB'));
      }
    } else {
      next(createError(403, 'Forbidden action'));
    }
  }
);

module.exports = router;
