import React from 'react';
import { Link } from 'react-router';
import { Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveUserRecipe, findIfSaved } from '../../actions/profileActions';

class RecipeCookingCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      successSave: '',
      id: this.props.id,
    };

    this.saveRecipe = this.saveRecipe.bind(this);
  }

  saveRecipe() {
    this.props.saveUserRecipe({ id: this.props.id })
      .then(
        () => this.setState({ successSave: 'Saved' })
      );
  }

  componentWillReceiveProps(nextProps) {
    this.props.findIfSaved(nextProps.id)
      .then((res) => {
        if (res.data.success) {
          this.setState({ successSave: 'Saved' });
        }
      });
  }

  render() {
    console.log(this.props.ingredients);
    const ingredientsList = this.props.ingredients.map(item => {
      return <div key={item.ingredient}>{item.amount + ' ' + item.unit} {item.ingredient}</div>;
    });

    const stepsList = this.props.steps.map(step => {
      return <div key={step.text}><li>{step.text}</li></div>;
    });
    return (
      <div className="color-fill col-md-9 col-md-offset-1">
        <Col className="recipe-cooking-card vertical-line" md={2}>
          <h2>Ingredients</h2>
          Portions: {this.props.portions}
          {ingredientsList}
          <br />
          { this.props.auth.user.username ?
            <Button onClick={this.saveRecipe} bsSize="small" bsStyle="primary">
              {this.state.successSave ? this.state.successSave : 'Save Recipe'}
            </Button> : ''}
        </Col>
        <Col className="recipe-cooking-card pos-right" md={7}>
          <h2 className="text-center">Cooking Steps</h2>
          <ol>
            {stepsList}
          </ol>
          Author: {this.props.author} <br /> <br />
          { this.props.author === this.props.auth.user.username ?
           <Link to={`/edit/${this.props.id}`} className="btn btn-success">Edit Recipe</Link> : '' }
        </Col>
      </div>
    );
  }
}

RecipeCookingCard.propTypes = {
  ingredients: React.PropTypes.array.isRequired,
  portions: React.PropTypes.string.isRequired,
  steps: React.PropTypes.array.isRequired,
  author: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  auth: React.PropTypes.object.isRequired,
  saveUserRecipe: React.PropTypes.func.isRequired,
  findIfSaved: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { saveUserRecipe, findIfSaved })(RecipeCookingCard);
