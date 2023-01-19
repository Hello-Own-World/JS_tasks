const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    accessToken: '123123',
  });
});

module.exports = router;
