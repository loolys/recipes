import React from 'react';
import { Link } from 'react-router';
import { Col } from 'react-bootstrap';

const RecipeCookingCard = props => {
  console.log(props);
  const ingredientsList = props.ingredients.map(item => {
    return <div key={item.ingredient}>{item.amount} {item.ingredient}</div>;
  });

  const stepsList = props.steps.map(step => {
    return <div key={step.text}><li>{step.text}</li></div>;
  });
  return (
    <div className="color-fill col-md-7 col-md-offset-2">
      <Col className="recipe-cooking-card vertical-line" md={2}>
        <h2>Ingredients</h2>
        Portions: {props.portions}
        {ingredientsList}
      </Col>
      <Col className="recipe-cooking-card pos-right" md={5}>
        <h2>Cooking Steps</h2>
        <ol>
          {stepsList}
        </ol>
        Author: {props.author} <br />
        <Link to={`/edit/${props.id}`} className="btn btn-success">Edit Recipe</Link>
      </Col>
    </div>
  );
};

RecipeCookingCard.propTypes = {
  ingredients: React.PropTypes.array.isRequired,
  portions: React.PropTypes.string.isRequired,
  steps: React.PropTypes.array.isRequired,
  author: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
};

export default RecipeCookingCard;
