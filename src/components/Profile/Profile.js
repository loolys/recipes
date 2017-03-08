import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

class Profile extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3} className="text-center">
            <PageHeader>Your Profile Page.</PageHeader>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Profile;
