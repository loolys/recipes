import React from 'react';
import { connect } from 'react-redux';
import { getRecipe } from '../../actions/recipeActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

class Recipe extends React.Component {
  componentDidMount() {
    this.props.getRecipe(this.props.params.id);
  }
  render() {
    return (
      <div>
        hello from recipe. auth: {this.props.auth.user.username}
      </div>
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
