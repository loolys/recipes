import React from 'react';
import { connect } from 'react-redux';
import { Media, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { getSavedRecipes } from '../../actions/profileActions';

class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.props.getSavedRecipes(this.props.auth.user.username).then(
      res =>  {this.setState({ data: res.data.docs });}
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
        {recipeMedia}
      </div>
    );
  }
}

SavedRecipes.propTypes = {
  getSavedRecipes: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {getSavedRecipes})(SavedRecipes);
