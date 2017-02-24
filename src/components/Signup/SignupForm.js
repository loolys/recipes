import React, { Component } from 'react';
import classnames from 'classnames';
import validateSignup from '../../validators/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    this.setState({ errors: {}, isLoading: true });
    event.preventDefault();

    const { errors, isValid } = validateSignup(this.state);
    if (isValid) {
      this.props.userSignupRequest(this.state)
        .then(() => {},
          err => this.setState({ errors: err.response.data }));
    } else {
      this.setState({ errors, isLoading: false });
    }
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign Up</h1>

        <TextFieldGroup
          field="username"
          value={this.state.username}
          label="Username"
          onChange={this.onChange}
          error={errors.username}
        />

        <TextFieldGroup
          field="password"
          value={this.state.password}
          label="password"
          onChange={this.onChange}
          error={errors.password}
          type="password"
        />

        <TextFieldGroup
          field="passwordConfirmation"
          value={this.state.passwordConfirmation}
          label="Confirm Password"
          onChange={this.onChange}
          error={errors.passwordConfirmation}
          type="password"
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default SignupForm;
