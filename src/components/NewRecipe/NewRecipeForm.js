import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRecipe } from '../../actions/recipeActions';
import TextFieldGroup from '../common/TextFieldGroup';

class NewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createRecipe(this.state);
  }

  render() {
    const { title, errors, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Add a Recipe</h1>

        <TextFieldGroup
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
          field="title"
          label="Title"
        />

      </form>
    );
  }
}

NewRecipeForm.propTypes = {
  createRecipe: React.PropTypes.func.isRequired,
};

export default connect(null, { createRecipe })(NewRecipeForm);
