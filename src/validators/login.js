import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

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

export default validateInput;
