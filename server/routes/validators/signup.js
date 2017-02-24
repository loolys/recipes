const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

function validateSignup(data) {
  const errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = 'Enter a username';
  }

  if (data.password !== data.passwordConfirmation) {
    errors.password = 'password must match';
    errors.passwordConfirmation = 'password must match';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Enter a password';
  }

  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Please confirm password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateSignup;
