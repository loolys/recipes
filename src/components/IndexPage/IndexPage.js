import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
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
      <Grid>
        <Row>
          <Col lg={6} lgOffset={3} md={7} mdOffset={2} sm={8} smOffset={2} xs={10} xsOffset={1}>
            <IndexCarousel images={this.state.carouselData} />
          </Col>
        </Row>
        <Row>
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
