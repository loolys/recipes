const express = require('express');
const authenticate = require('../middlewares/authenticate');
const validateInput = require('./validators/recipe');

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  if (isValid) {
    res.status(201).json({ success: true });
  } else {
    res.status(400).json({ errors });
  }
});

module.exports = router;
