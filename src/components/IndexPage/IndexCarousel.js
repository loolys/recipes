import React, { Component } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router';

import './IndexCarousel.css';

class IndexCarousel extends Component {
  render() {
    const { images } = this.props;
    const Caro = images.map((item) => {
      return (
        <Carousel.Item key={item._id} className="carousel-image">
          <Link to={`/recipe/${item._id}`}>
            <Image className="carousel-image" alt={item.title} src={item.image} />
            <Carousel.Caption>
              <h3>{item.title}</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>     
      );
    });
    return (
      <Carousel>
        {Caro}
      </Carousel>
    );
  }
}

IndexCarousel.propTypes = {
  images: React.PropTypes.array.isRequired,
};

export default IndexCarousel;
