import React from 'react';
import { connect } from 'react-redux';
import { Media, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchUsersRecipes, deleteRecipe } from '../../actions/recipeActions';

class UserRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user ? this.props.user : '',
      data: [],
      errors: {},
      showRecipes: false,
      alert: null
    };

    this.toggleRecipes = this.toggleRecipes.bind(this);
    this.deleteWarning = this.deleteWarning.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  toggleRecipes() {
    this.setState({ showRecipes: !this.state.showRecipes });
  }

  deleteWarning = (id) => () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Delete Recipe"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={this.deleteRecipe(id)}
        onCancel={() => this.hideAlert()}
      >
        This action will delete your recipe
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }

  deleteRecipe = (id) => () => {
    this.props.deleteRecipe(id)
      .then(
        () => {
          const filtered = _.filter(this.state.data, (obj) => {
            return obj._id !== id;
          });
          this.setState({ data: filtered, alert: null });
        }
      );
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  componentDidMount() {
    this.props.fetchUsersRecipes(this.props.user).then(
      res => { this.setState({ data: res.data.docs })},
      err => { this.setState({ errors: err.error })}
    );
  }

  render() {
    console.log(this.state.data);
    const recipeMedia = this.state.data.map(item => {
      return (<div key={item._id}>
          <ListGroupItem>
            <Media>
              <Media.Left>
                <Link to={`/recipe/${item._id}`}>
                  <img width={64} height={64} src={item.image} alt={item.title} />
                </Link>
              </Media.Left>
              <Media.Body>
                <Media.Heading>{item.title}</Media.Heading>
                <p>
                  <Link to={`/recipe/${item._id}`}>
                    {item.description}
                  </Link>
                  <span>
                    <Button
                      onClick={this.deleteWarning(item._id)}
                      className="pull-right"
                      bsStyle="danger">
                        Delete
                    </Button>
                  </span>
                </p>
              </Media.Body>
            </Media>
          </ListGroupItem>
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
          {this.state.alert}
      </div>
    );
  }
}

UserRecipes.propTypes = {
  user: React.PropTypes.string.isRequired,
  fetchUsersRecipes: React.PropTypes.func.isRequired,
  deleteRecipe: React.PropTypes.func.isRequired,
}

export default connect(null, { fetchUsersRecipes, deleteRecipe })(UserRecipes);
