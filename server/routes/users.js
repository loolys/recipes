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
    res.status(400).json({ errors });
  }
});

router.get('/:username', (req, res) => {
  const query = UserModel.where({ username: req.params.username.toLowerCase() });
  // only return _id and username field
  query.select('username');
  query.findOne((err, found) => {
    if (err) throw err;
    if (found) {
      res.json({ found });
    } else {
      res.json({ found: 'noting' });
    }
  });
});

module.exports = router;
