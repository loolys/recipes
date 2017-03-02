import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

class RecipeTitleCard extends Component {
  render() {
    return (
      <Grid className="">
        <Row className="text-center ">
          <Col md={3} mdoffset={3} className="recipe-title-card">
            <Image className="recipe-img" src={this.props.image} responsive  />
          </Col>
          <Col md={4} className="recipe-title-card">
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

RecipeTitleCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
};

export default RecipeTitleCard;
