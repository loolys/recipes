import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateSignup(data) {
  const { username, password, passwordConfirmation } = data;
  let errors = {};

  if (validator.isEmpty(username)) {
    errors.username = 'Please enter a username';
  }

  if (password !== passwordConfirmation) {
    errors.password = 'Password must match';
    errors.passwordConfirmation = 'Password must match';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Enter a password';
  }

  if (validator.isEmpty(passwordConfirmation)) {
    errors.passwordConfirmation = 'Please enter password confirmation';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateSignup;
