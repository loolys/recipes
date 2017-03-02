import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import IndexCarousel from './IndexCarousel';
import { getFeatured } from '../../actions/recipeActions';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.props.getFeatured()
    .then((res) => this.setState({ data: res.data.docs }));
  }
  render() {
    console.log(this.state.data);
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <IndexCarousel images={this.state.data} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

IndexPage.propTypes = {
  getFeatured: React.PropTypes.func.isRequired,
};

export default connect(null, { getFeatured })(IndexPage);
