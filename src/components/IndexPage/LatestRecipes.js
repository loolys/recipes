import React from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';

class LatestRecipes extends React.Component {
  render() {
    console.log(this.props.data);
    const thumbnails = this.props.data.map(item => {
      let description;
      if (item.description.length > 25) {
        description = item.description.slice(0,25) + "...";
      } else {
        description = item.description;
      }
      return (<Col key={item._id} xs={6} md={3} sm={3} lg={2}>
        <Link to={`/recipe/${item._id}`}>
          <Thumbnail className="thumbnail-size" src={item.image} alt="food">
            <h4 className="dark-font">{item.title}</h4>
            <p className="thumbnail-size">{description}</p>
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
