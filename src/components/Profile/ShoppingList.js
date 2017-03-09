import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ShoppingList extends React.Component {
  render() {
    const shoppingList = this.props.ingredients.map(item => {
      return (
        <div key={item.ingredient}>
          <ListGroupItem>
            {item.amount + ' ' + item.unit + ' ' + item.ingredient}
          </ListGroupItem>
        </div>
      );
    })
    return (
      <div>
        <ListGroup>{shoppingList}</ListGroup>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  ingredients: React.PropTypes.array.isRequired,
};
