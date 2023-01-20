const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const { userSchema } = require('../../modules');
const { auth, validate } = require('../../middleware');

const router = express.Router();

// Register
router.post('/register', validate(userSchema.regBodyPost), async (req, res) => {
  const userData = req.body;
  try {
    userData.login = userData.login.toLowerCase();
    const foundUser = await User.findOne({ login: userData.login });
    if (foundUser) {
      throw new Error('User exists');
    }
    const user = new User(userData);
    await user.save();
    res.status(200).json({ msg: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Login
router.post('/login', validate(userSchema.logBodyPost), async (req, res) => {
  const { login, pass } = req.body;

  const user = await User.findOne({ login });

  if (user && (await bcrypt.compare(pass, user.pass))) {
    const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } else {
    res.status(404).send('Wrong input');
  }
});

// Get particular user
router.get('/info', [validate(userSchema.bodyDel), auth], async (req, res) => {
  const { login } = req.body;

  const userExists = await User.findOne({ login });

  if (!userExists) {
    res.status(404).send(`User '${login}' is not in the DB`);
    return;
  }
  if (userExists.id === req.user.id) {
    try {
      userExists.pass = undefined;
      res.status(200).send(userExists);
    } catch {
      res.status(404).send('Error occured getting user info');
    }
  } else {
    res.status(404).send('Permission denied');
  }
});

// PUT particular user
router.put(
  '/info',
  [validate(userSchema.bodyPut), auth],
  async (req, res, next) => {
    const { login, pass, firstName, lastName, phone } = req.body;

    const userExists = await User.findOne({ login });

    if (!userExists) {
      // FIXME - next(new Error ())
      res.status(404).json({ msg: `User  ${login}  is not in the DB` });
      return;
    }

    if (userExists.id === req.user.id) {
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
        res.status(404).send('Error occured editing user info ');
        // FIXME - next(err)
        // next(new HttpError(500, err.message));
        next(new Error(err));
      }
    } else {
      res.status(404).send('Permission denied');
    }
  }
);

// Delete user
router.delete(
  '/info',
  [validate(userSchema.bodyDel), auth],
  async (req, res) => {
    const { login } = req.body;

    const userExists = await User.findOne({ login });

    if (!userExists) {
      res.status(404).json({ msg: `User  ${login}  is not in the DB` });
      return;
    }

    if (userExists.id === req.user.id) {
      try {
        await User.deleteOne({ login });
        res
          .status(200)
          .json({ msg: `Successful deletion of user: ${userExists.login}` });
      } catch {
        res.status(404).send('Error occured while deleting the user');
      }
    } else {
      res.status(404).send('Permission denied');
    }
  }
);

module.exports = router;
