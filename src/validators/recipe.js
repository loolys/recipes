import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import validUrl from 'valid-url';

function validateInput(data) {
  const errors = {};
  if (validator.isEmpty(data.title)) {
    errors.title = 'Please add a title';
  }

  if (validator.isEmpty(data.description)) {
    errors.description = 'Please add a description';
  }

  if (validator.isEmpty(data.image)) {
    errors.image = 'Please add an image';
  }

  for (let i = 0; i < data.ingredients.length; i += 1) {
    if (validator.isEmpty(data.ingredients[i].ingredient)) {
      errors.ingredients = 'Please add an ingredient';
    }
  }

  for (let i = 0; i < data.ingredients.length; i += 1) {
    if (validator.isEmpty(data.ingredients[i].category)) {
      errors.ingredients = 'Please add category to your ingredients';
    }
  }

  for (let i = 0; i < data.steps.length; i += 1) {
    if (validator.isEmpty(data.steps[i].text)) {
      errors.steps = 'Please fill in your steps';
    }
  }

  if (!validUrl.isUri(data.image)) {
    errors.image = 'Please enter a valid URL';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateInput;
