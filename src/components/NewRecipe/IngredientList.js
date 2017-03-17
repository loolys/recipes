import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import lodashMap from 'lodash/map';
import classnames from 'classnames';
import CookingUnits from './data/units';
import ProductCategories from './data/products';

class IngredientList extends Component {
  render() {
    const options = lodashMap(CookingUnits, (val, key) =>
      <option key={val} value={val}>{val}</option>,
    );

    const catOptions = lodashMap(ProductCategories, (val, key) =>
      <option key={val} value={val}>{val}</option>,
    );

    const { ingredients, changeIngredient, removeIngredient, error } = this.props;

    return (
      <div>
        {ingredients.map((ingredient, index) => {
          return (<div className={classnames('form-group', { 'has-error': error })} key={index}>
            {index + 1 + '. '}
            <input
              className="amount-input ingredient-list ingredient-unit"
              type="number"
              name="amount"
              placeholder="0"
              value={ingredient.amount}
              onChange={changeIngredient(index)}
            />
            <select
              className="ingredient-list ingredient-unit"
              name="unit"
              onChange={changeIngredient(index)}
              value={ingredient.unit}
            >
              <option value="" disabled>Unit</option>
              {options}
            </select>
            <input
              className="ingredient-list ingredient-text"
              type="text"
              name="ingredient"
              placeholder="ingredient"
              value={ingredient.ingredient}
              onChange={changeIngredient(index)}
            />
            <select
              className="ingredient-list ingredient-text"
              name="category"
              onChange={changeIngredient(index)}
              value={ingredient.category}
            >
              <option value="" disabled>category</option>
              {catOptions}
            </select>
            <Button
              onClick={removeIngredient(index)}
              bsStyle="danger"
              bsSize="xsmall"
            >
                x
            </Button>
          </div>);
        })}
      </div>
    );
  }
}

IngredientList.propTypes = {
  ingredients: React.PropTypes.array.isRequired,
  changeIngredient: React.PropTypes.func.isRequired,
  removeIngredient: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
};

export default IngredientList;
