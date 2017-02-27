const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

function validateInput(user) {
  const errors = {};
  if (validator.isEmpty(user.username)) {
    errors.username = 'Please enter your username';
  }

  if (validator.isEmpty(user.password)) {
    errors.password = 'Please enter your password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateInput;
