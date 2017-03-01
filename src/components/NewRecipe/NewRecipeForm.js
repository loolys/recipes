import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Thumbnail, Button } from 'react-bootstrap';
import validUrl from 'valid-url';
import { createRecipe } from '../../actions/recipeActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Facts from './Facts';
import StepsList from './StepsList';
import IngredientList from './IngredientList';


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
      steps: [{ text: '' }],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.appendIngredient = this.appendIngredient.bind(this);
    this.changeIngredient = this.changeIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.appendStep = this.appendStep.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
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

  appendStep(e) {
    e.preventDefault();

    const stepObj = { text: '' };
    this.setState({ steps: this.state.steps.concat(stepObj) });
  }

  changeStep = (idx) => (evt) => {
    const newStep = this.state.steps.map((step, sidx) => {
      if (idx !== sidx) return step;
      return { ...step, [evt.target.name]: evt.target.value };
    });

    this.setState({ steps: newStep });
  }

  removeStep = (idx) => () => {
    this.setState({
      steps: this.state.steps.filter((s, sidx) => idx !== sidx)
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
        
        <IngredientList
          ingredients={this.state.ingredients}
          changeIngredient={this.changeIngredient}
          removeIngredient={this.removeIngredient}
        />

        <div><button onClick={this.appendIngredient}>Add ingredient</button></div>
        <br />
        <label htmlFor="steps">Cooking Steps</label>
        <StepsList
          changeStep={this.changeStep}
          removeStep={this.removeStep}
          steps={this.state.steps}
        />

        <div><button onClick={this.appendStep}>Add Step</button></div>

        
      </form>
    );
  }
}

NewRecipeForm.propTypes = {
  createRecipe: React.PropTypes.func.isRequired,
};

export default connect(null, { createRecipe })(NewRecipeForm);
