import React, { Component } from 'react';
import classnames from 'classnames';
import validateSignup from '../../validators/signup';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();

    const { errors, isValid } = validateSignup(this.state);
    if (isValid){
      this.props.userSignupRequest(this.state)
        .then(() => {},
          err => this.setState({ errors: err.response.data }));
    } else {
      this.setState({ errors });
    }
    
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign Up</h1>

        <div className={classnames('form-group', { 'has-error': errors.username })}>
          <label className="control-label">Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            className="form-control"
          />
          { errors.username ? <span className="help-block">{errors.username}</span> : '' }
        </div>

        <div className={classnames('form-group', { 'has-error': errors.password })}>
          <label className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className="form-control"
          />
          { errors.password ? <span className="help-block">{errors.password}</span> : '' }
        </div>

        <div className={classnames('form-group', { 'has-error': errors.passwordConfirmation })}>
          <label className="control-label">Confirm Password</label>
          <input
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
          { errors.passwordConfirmation ? <span className="help-block">{errors.passwordConfirmation}</span> : '' }
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lg">
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
