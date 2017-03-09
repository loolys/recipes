import React from 'react';
import { connect } from 'react-redux';
import { Media, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { getSavedRecipes, removeSavedRecipe } from '../../actions/profileActions';

class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: '',
    };
  }

  componentDidMount() {
    this.props.getSavedRecipes(this.props.auth.user.username).then(
      res =>  {
        this.setState({ data: res.data.docs });
      },
      err => { this.setState({ error: 'could not load recipes'});}
    );
  }

  removeRecipe(item) {
    console.log(item);
    this.props.removeSavedRecipe(item).then(
      () => {
        const filtered = this.state.data.filter(thing => {
          return thing._id !== item._id;
        });
        this.setState({ data: filtered });
      },
      err => {
        this.setState({ error: 'could not remove' });
      }
    );
  }

  render() {
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
                <Media.Heading>
                  <Link to={`/recipe/${item._id}`}>
                    {item.title}
                  </Link>
                </Media.Heading>
                <p><Link to={`/recipe/${item._id}`}>
                  {item.description}</Link>
                  <Button
                    bsStyle="danger"
                    className="pull-right"
                    onClick={this.removeRecipe.bind(this, item)}
                  >
                    Delete
                  </Button>
                </p>
              </Media.Body>
            </Media>
          </ListGroupItem>
      </div>);
    });

    return (
      <div className="col-md-6">
        {recipeMedia}
      </div>
    );
  }
}

SavedRecipes.propTypes = {
  getSavedRecipes: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  removeSavedRecipe: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { getSavedRecipes, removeSavedRecipe })(SavedRecipes);
