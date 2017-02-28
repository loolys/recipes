const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require('../models/user-model');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: 'Failed to authenticate' });
      } else {
        const query = UserModel.where({ _id: decoded.id });
        query.findOne({}, '_id username', (error, found) => {
          if (!found) {
            res.status(404).json({ errors: 'No such user' });
          } else {
            req.currentUser = found;
            next();
          }
        });
      }
    });
  } else {
    res.status(403).json({ errors: 'No token provided' });
  }
};
