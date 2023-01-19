const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('users/loginUser');
});

router.get('/signUp', async (req, res) => {
  res.render('users/createUser');
});

module.exports = router;
