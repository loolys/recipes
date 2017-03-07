import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { getRecipe } from '../../actions/recipeActions';
import RecipeTitleCard from './RecipeTitleCard';
import RecipeCookingCard from './RecipeCookingCard';

import './Recipe.css'

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      description: '',
      image: '',
      ingredients: [],
      portions: '',
      steps: [],
      time: '',
      author: '',
    };
  }

  componentWillMount() {
    this.props.getRecipe(this.props.params.id)
      .then((res) => {
        this.setState({
          id: res.data._id,
          title: res.data.title,
          description: res.data.description,
          image: res.data.image,
          ingredients: res.data.ingredients,
          portions: res.data.portions,
          steps: res.data.steps,
          time: res.data.time,
          author: res.data.username,
        });
      });
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col mdOffset={2}>
          <RecipeTitleCard
            title={this.state.title}
            description={this.state.description}
            image={this.state.image}
          />
          </Col>
        </Row>
        <Row className="show-grid">
          <RecipeCookingCard
            ingredients={this.state.ingredients}
            portions={this.state.portions}
            steps={this.state.steps}
            author={this.state.author}
            id={this.state.id}
          />
        </Row>
      </Grid>
    );
  }
}

Recipe.propTypes = {
  auth: React.PropTypes.object.isRequired,
  getRecipe: React.PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { getRecipe },
)(Recipe);
