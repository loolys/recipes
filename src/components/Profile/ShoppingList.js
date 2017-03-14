import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import classnames from 'classnames';
import _ from 'lodash';

import './ShoppingList.css';

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineThrough : [],
    }
  }

  componentWillMount() {
    const line = this.props.ingredients.map(item => {
      return {item: false}
    });
    this.setState({ lineThrough: line });
  }

  lineThrough = (index) => (evt) => {
    let updateOrder = _.clone(this.state.lineThrough);
    updateOrder[index].item = !this.state.lineThrough[index].item;
    this.setState({ lineThrough: updateOrder });
  }
  render() {
    console.log(this.state.lineThrough[0].item);
    const shoppingList = this.props.ingredients.map((item, index) => {
      return (
        <div
          key={item.ingredient}
          onClick={this.lineThrough(index)}
          className={classnames('', { 'line-through': this.state.lineThrough[index].item})}
        >
          <ListGroupItem
            name={item.ingredient}
          >
            {item.amount + ' ' + item.unit + ' ' + item.ingredient}
            <small className="pull-right">{item.category}</small>
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
