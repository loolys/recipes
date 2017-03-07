import React, { Component } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router';

class IndexCarousel extends Component {
  render() {
    const { images } = this.props;
    const Caro = images.map((item) => {
      return (
        <Carousel.Item key={item._id}>
          <Link to={`/recipe/${item._id}`}>
            <Image width={600} height={400} alt={item.title} src={item.image} responsive />
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
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