import React from 'react';
import { connect } from 'react-redux';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router';
import { fetchUsersRecipes } from '../../actions/recipeActions';

class UserRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user ? this.props.user : '',
      data: [],
      errors: {},
    };
  }

  componentDidMount() {
    this.props.fetchUsersRecipes(this.props.user).then(
      res => { this.setState({ data: res.data.docs })},
      err => { this.setState({ errors: err.error })}
    );
  }

  render() {
    console.log(this.state);
    const recipeMedia = this.state.data.map(item => {
      return (<div key={item._id}>
        <Link to={`/recipe/${item._id}`}>
        <Media>
          <Media.Left>
            <img width={64} height={64} src={item.image} alt={item.title} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>{item.title}</Media.Heading>
            <p>{item.description}</p>
          </Media.Body>
        </Media>
        </Link>
      </div>);
    });
    console.log(recipeMedia);
    return (
      <div>
        {recipeMedia}
      </div>
    );
  }
}

UserRecipes.propTypes = {
  user: React.PropTypes.string.isRequired,
  fetchUsersRecipes: React.PropTypes.func.isRequired,
}

export default connect(null, { fetchUsersRecipes })(UserRecipes);
