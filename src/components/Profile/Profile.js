import React from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import UserRecipes from './UserRecipes';

class Profile extends React.Component {
  render() {
    const user = this.props.params.user;
    return (
      <Grid>
        <Row className="container white-bg latest-recipes-box">
          <Col className="text-center dark-frame">
            <span className="title-text">Your Profile</span>
          </Col>
        </Row>
        <Row className="white-bg padding-left">
          <br />
          <UserRecipes user={user} />
          <br />
        </Row>
      </Grid>
    );
  }
}

export default Profile;
