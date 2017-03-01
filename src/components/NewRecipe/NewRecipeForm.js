import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Thumbnail } from 'react-bootstrap';
import validUrl from 'valid-url';
import { createRecipe } from '../../actions/recipeActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Facts from './Facts';

class NewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false,
      description: '',
      image: '',
      time: '0',
      portions: '0',
      ingredients: [{ amount: '', unit: '', ingredient: 'test', category: '' }],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.appendIngredient = this.appendIngredient.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createRecipe(this.state);
  }

  appendIngredient(e) {
    e.preventDefault();
    const ingredientObj = { amount: '', unit: '', ingredient: 'test', category: '' };

    this.setState({ ingredients: this.state.ingredients.concat(ingredientObj) });
  }


  render() {
    const { title, errors, isLoading, description, image, time, portions } = this.state;
    let imgSrc;
    if (validUrl.isUri(image)) {
      imgSrc = image;
    } else {
      imgSrc = 'placeholder-thumbnail-medium.png';
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Add a Recipe</h1>

        <TextFieldGroup
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
          field="title"
          label="Recipe Title"
        />
     
        <label htmlFor="description">Short Recipe Description</label>
        <textarea
          name="description"
          value={description}
          onChange={this.onChange}
          cols="51"
          rows="3"
        />
     
        <label htmlFor="image">Your Image</label>
        <Thumbnail href="#" src={imgSrc} />

        <TextFieldGroup
          name="image"
          value={image}
          onChange={this.onChange}
          error={errors.image}
          field="image"
          label="Image URL Link"
        />
      
        <Facts
          time={time}
          portions={portions}
          onChange={this.onChange}
        />
        
        {this.state.ingredients.map((ingredient, index) => {
          return (<div className="form-group" key={index}>
            <input type="text" />
            <button onClick={this.appendIngredient}>add</button>
          </div>);
        })}
      </form>
    );
  }
}

NewRecipeForm.propTypes = {
  createRecipe: React.PropTypes.func.isRequired,
};

export default connect(null, { createRecipe })(NewRecipeForm);
