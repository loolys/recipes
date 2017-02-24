const express = require('express');
const validateInput = require('./validators/signup');
const UserModel = require('../models/user-model');

const router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  if (isValid) {
    let username = req.body.username;
    const password = req.body.password;
    // make case insensitive
    username = username.toLowerCase();
    const user = new UserModel({
      username,
      password,
    });

    user.save((err) => {
      if (err) {
        res.status(500).json({ success: false,
          status: '500',
          errors: { username: 'Username exists' },
        });
      } else {
        res.json({ success: true, status: 200, errors: {} });
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

module.exports = router;
