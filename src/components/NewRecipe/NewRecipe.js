import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import NewRecipeForm from './NewRecipeForm';

import './NewRecipe.css';

class NewRecipe extends Component {
  render() {
    return (
      <Grid className="latest-polls">
        <Row className="show-grid">
          <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
            <NewRecipeForm />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default NewRecipe;
