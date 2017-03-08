import React from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import UserRecipes from './UserRecipes';

class Profile extends React.Component {
  render() {
    const user = this.props.params.user;
    return (
      <Grid>
        <Jumbotron>
          <Row>
            <Col md={6} mdOffset={3} className="text-center">
              <h2>Your Profile Page.</h2>
            </Col>
          </Row>
          <Row>
            <UserRecipes user={user} />
          </Row>
        </Jumbotron>
      </Grid>
    );
  }
}

export default Profile;
