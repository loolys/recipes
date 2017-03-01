import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import lodashMap from 'lodash/map';
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

    const { ingredients, changeIngredient, removeIngredient } = this.props;

    return (
      <div>
        {ingredients.map((ingredient, index) => {
          return (<div className="form-group" key={index}>
            <input
              className="amount-input ingredient-list"
              type="text"
              name="amount"
              placeholder="0"
              value={ingredient.amount}
              onChange={changeIngredient(index)}
            />
            <select
              className="ingredient-list"
              name="unit"
              onChange={changeIngredient(index)}
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
              onChange={changeIngredient(index)}
            />
            <select
              className="ingredient-list"
              name="category"
              onChange={changeIngredient(index)}
              value={ingredient.category}
            >
              <option value="" disabled>category</option>
              {catOptions}
            </select>
            <Button
              onClick={removeIngredient(index)}
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
  ingredients: React.PropTypes.object.isRequired,
  changeIngredient: React.PropTypes.func.isRequired,
  removeIngredient: React.PropTypes.func.isRequired,
};

export default IngredientList;
