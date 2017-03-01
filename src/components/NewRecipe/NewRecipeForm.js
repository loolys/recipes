import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Thumbnail, Button } from 'react-bootstrap';
import lodashMap from 'lodash/map';
import validUrl from 'valid-url';
import { createRecipe } from '../../actions/recipeActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Facts from './Facts';
import CookingUnits from './data/units';
import ProductCategories from './data/products';

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
      ingredients: [{ amount: '', unit: '', ingredient: '', category: '' }],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.appendIngredient = this.appendIngredient.bind(this);
    this.changeIngredient = this.changeIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
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
    const ingredientObj = { amount: '', unit: '', ingredient: '', category: '' };

    this.setState({ ingredients: this.state.ingredients.concat(ingredientObj) });
  }

  changeIngredient = (idx) => (evt) => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, [evt.target.name]: evt.target.value };
    });

    this.setState({ ingredients: newIngredients });
  }

  removeIngredient = (idx) => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  }


  render() {
    const { title, errors, isLoading, description, image, time, portions } = this.state;
    let imgSrc;
    if (validUrl.isUri(image)) {
      imgSrc = image;
    } else {
      imgSrc = 'placeholder-thumbnail-medium.png';
    }

    const options = lodashMap(CookingUnits, (val, key) =>
      <option key={val} value={val}>{val}</option>
    );

    const catOptions = lodashMap(ProductCategories, (val, key) =>
      <option key={val} value={val}>{val}</option>
    );

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
        
        <label htmlFor="ingredients">Ingredients</label>
        {this.state.ingredients.map((ingredient, index) => {
          return (<div className="form-group" key={index}>
            <input
              className="amount-input ingredient-list"
              type="text"
              name="amount"
              placeholder="0"
              value={ingredient.amount}
              onChange={this.changeIngredient(index)}
            />
            <select
              className="ingredient-list"
              name="unit"
              onChange={this.changeIngredient(index)}
              value={ingredient.unit}
            >
              <option value="" disabled>Unit</option>
              {options}
            </select>
            <input
              className="ingredient-list"
              type="text"
              name="ingredient"
              placeholder="ingredient"
              value={ingredient.ingredient}
              onChange={this.changeIngredient(index)}
            />
            <select
              className="ingredient-list"
              name="category"
              onChange={this.changeIngredient(index)}
              value={ingredient.category}
            >
              <option value="" disabled>category</option>
              {catOptions}
            </select>
            <Button
              onClick={this.removeIngredient(index)}
              bsSize="xsmall">
                x
            </Button>
          </div>);
        })}

        <div><button onClick={this.appendIngredient}>Add ingredient</button></div>
      </form>
    );
  }
}

NewRecipeForm.propTypes = {
  createRecipe: React.PropTypes.func.isRequired,
};

export default connect(null, { createRecipe })(NewRecipeForm);
