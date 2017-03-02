import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import { getRecipe } from '../../actions/recipeActions';
import RecipeTitleCard from './RecipeTitleCard';

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
      .then((res) => this.setState({
        title: res.data.title,
        description: res.data.description,
        image: res.data.image,
        ingredients: res.data.ingredients,
        portions: res.data.portions,
        steps: res.data.steps,
        time: res.data.time,
        author: res.data.username,
      }));
  }
  render() {
    console.log(this.state);
    return (
      <Grid>
        <Row>
          <RecipeTitleCard
            title={this.state.title}
            description={this.state.description}
            image={this.state.image}
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
