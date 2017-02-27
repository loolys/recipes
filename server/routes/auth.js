const express = require('express');
const UserModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

router.post('/', (req, res) => {
  const { password } = req.body;
  const username = req.body.username.toLowerCase();

  const query = UserModel.where({ username });

  query.findOne((err, found) => {
    if (err) throw err;
    if (found) {
      found.comparePassword(password, (error, isMatch) => {
        if (error) throw err;
        if (isMatch) {
          const token = jwt.sign({
            id: found.get('_id'),
            username: found.get('username'),
          }, config.jwtSecret);
          res.json({ token });
        } else {
          res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
      });
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });
});

module.exports = router;
