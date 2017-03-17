import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import NewRecipeForm from './NewRecipeForm';

import './NewRecipe.css';

class NewRecipe extends Component {
  render() {
    return (
      <Grid className="latest-polls">
        <Row className="show-grid">
          <Col md={8} mdOffset={2} sm={11} smOffset={1} xs={12} xsOffset={0}>
            <NewRecipeForm id={this.props.params.id} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default NewRecipe;
