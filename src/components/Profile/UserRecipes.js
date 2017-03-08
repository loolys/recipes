import React from 'react';
import { connect } from 'react-redux';
import { fetchUsersRecipes } from '../../actions/recipeActions';

class UserRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }

  componentDidMount() {
    this.props.fetchUsersRecipes(this.props.user);
  }

  render() {
    return (
      <div>
        Hello from UserRecipes. {this.state.user}
      </div>
    );
  }
}

UserRecipes.propTypes = {
  user: React.PropTypes.string.isRequired,
  fetchUsersRecipes: React.PropTypes.func.isRequired,
}

export default connect(null, { fetchUsersRecipes })(UserRecipes);
