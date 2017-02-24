import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';

import SignupForm from './SignupForm';

class Signup extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default connect(null, { userSignupRequest })(Signup);
