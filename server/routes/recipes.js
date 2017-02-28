const express = require('express');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  console.log(req.body);
  res.status(201).json({ success: true });
});

module.exports = router;
