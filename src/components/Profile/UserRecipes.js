import React from 'react';
import { connect } from 'react-redux';
import { Media, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { fetchUsersRecipes } from '../../actions/recipeActions';

class UserRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user ? this.props.user : '',
      data: [],
      errors: {},
      showRecipes: false,
    };

    this.toggleRecipes = this.toggleRecipes.bind(this);
  }

  toggleRecipes() {
    this.setState({ showRecipes: !this.state.showRecipes });
  }

  componentDidMount() {
    this.props.fetchUsersRecipes(this.props.user).then(
      res => { this.setState({ data: res.data.docs })},
      err => { this.setState({ errors: err.error })}
    );
  }

  render() {
    const recipeMedia = this.state.data.map(item => {
      return (<div key={item._id}>
        <Link to={`/recipe/${item._id}`}>
          <ListGroupItem>
            <Media>
              <Media.Left>
                <img width={64} height={64} src={item.image} alt={item.title} />
              </Media.Left>
              <Media.Body>
                <Media.Heading>{item.title}</Media.Heading>
                <p>{item.description}</p>
              </Media.Body>
            </Media>
          </ListGroupItem>
        </Link>
      </div>);
    });
    return (
      <div>
        <Button bsStyle="info" onClick={this.toggleRecipes}>
          { this.state.showRecipes ? 
          'Hide Recipes' : 'Show Your Recipes' }
        </Button>
        {this.state.showRecipes ?
          <div>
          <h3>Your Recipes</h3>
          <ListGroup>{recipeMedia}</ListGroup> </div> : '' }
      </div>
    );
  }
}

UserRecipes.propTypes = {
  user: React.PropTypes.string.isRequired,
  fetchUsersRecipes: React.PropTypes.func.isRequired,
}

export default connect(null, { fetchUsersRecipes })(UserRecipes);
