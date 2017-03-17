import React from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';

class LatestRecipes extends React.Component {
  render() {
    console.log(this.props.data);
    const thumbnails = this.props.data.map(item => {
      let description;
      if (item.description.length > 15) {
        description = item.description.slice(0,15) + "...";
      } else {
        description = item.description;
      }
      return (<Col key={item._id} xs={6} md={3} sm={3}>
        <Link to={`/recipe/${item._id}`}>
          <Thumbnail src={item.image} alt="food">
            <h3>{item.title}</h3>
            <p>{description}</p>
          </Thumbnail>
        </Link>
      </Col>);
    })
    return (
      <div>
        {thumbnails}
      </div>
    );
  }
}

LatestRecipes.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default LatestRecipes;
