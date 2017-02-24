import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';

class Signup extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <SignupForm userSignupRequest={userSignupRequest} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default connect((state) => { return {} }, { userSignupRequest })(Signup);
