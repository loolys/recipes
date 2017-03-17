import React from 'react';
import { connect } from 'react-redux';
import { searchRecipes } from '../../actions/recipeActions';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Media } from 'react-bootstrap';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      noResult: ''
    };
  }

  componentDidMount() {
    const search = this.props.location.query.search;

    this.props.searchRecipes({search})
      .then(
        res => this.setState({ data: res.data.docs })
      );
  }

  componentWillReceiveProps(nextProps) {
    // Solves multiple searches from this location.
    const search = nextProps.location.query.search;

    this.props.searchRecipes({search})
      .then(
        res => this.setState({ data: res.data.docs }),
        () => this.setState({ noResult: 'No results found for your search :(' })
      );
  }

  render() {
    const searchMedia = this.state.data.map(item => {
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
                </p>
              </Media.Body>
            </Media>
          </ListGroupItem>
      </div>);
    });

    return (
      <div>
        { this.state.data.length ?
          <ListGroup>{searchMedia}</ListGroup> :
          this.state.noResult
        }
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchRecipes: React.PropTypes.func.isRequired,
};

export default connect(null, { searchRecipes })(SearchResults);
