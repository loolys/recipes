import React from 'react';
import { connect } from 'react-redux';
import { Media, Button, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import underscore from 'underscore';
import { getSavedRecipes, removeSavedRecipe } from '../../actions/profileActions';
import ShoppingList from './ShoppingList';

class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      shoppingList: [],
      showShoppingList: false,
      error: '',
    };

    this.toggleShoppingList = this.toggleShoppingList.bind(this);
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

  toggleShoppingList() {
    this.setState({ showShoppingList: !this.state.showShoppingList });
  }

  render() {
    let sorted = [];
    if (this.state.data.length > 0) {
      let flatArr = this.state.data.map(item => {
        return item.ingredients;
      });

      flatArr = flatArr.reduce((a, b) => {
        return a.concat(b);
      });

      sorted = underscore.sortBy(flatArr, 'category');
    }
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
                    bsStyle="warning"
                    className="pull-right"
                    onClick={this.removeRecipe.bind(this, item)}
                  >
                    Remove
                  </Button>
                </p>
              </Media.Body>
            </Media>
          </ListGroupItem>
      </div>);
    });

    return (
      <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
        <Button onClick={this.toggleShoppingList} bsStyle="primary">
          Show Shopping List
        </Button>
        { this.state.showShoppingList ? <ShoppingList ingredients={sorted} /> : ''}
        
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
