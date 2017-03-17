import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import IndexCarousel from './IndexCarousel';
import LatestRecipes from './LatestRecipes';
import { getFeatured, getRecipeList } from '../../actions/recipeActions';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselData: [],
      latestRecipeData: [],
    };
  }

  componentDidMount() {
    this.props.getFeatured()
      .then((res) => this.setState({ carouselData: res.data.docs }));
    this.props.getRecipeList()
      .then(res => this.setState({ latestRecipeData: res.data.docs }));
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <IndexCarousel images={this.state.carouselData} />
        </Row>
        <Row className="container white-bg center latest-recipes-box">
          <Col className="text-center dark-frame">
            <span className="title-text">Latest Recipes</span>
          </Col>
          <br />
          <LatestRecipes data={this.state.latestRecipeData} />
        </Row>
      </Grid>
    );
  }
}

IndexPage.propTypes = {
  getFeatured: React.PropTypes.func.isRequired,
  getRecipeList: React.PropTypes.func.isRequired,
};

export default connect(null, { getFeatured, getRecipeList })(IndexPage);
