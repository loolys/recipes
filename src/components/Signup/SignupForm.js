import React, { Component } from 'react';
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
      isLoading: false,
      invalid: false,
    };

    this.onChange = this.onChange.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
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
        .then(() => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Account created',
          });
          this.context.router.push('/');
        },
          err => this.setState({ errors: err.response.data.errors }));
    } else {
      this.setState({ errors, isLoading: false });
    }
  }

  checkUserExists(event) {
    const val = event.target.value;
    if (val !== '') {
      this.props.doesUserExist(val)
        .then((res) => {
          if (res.data.found.username) {
            this.setState({ errors: {
              username: 'Username taken',
            },
              invalid: true });
          } else {
            this.setState({ errors: {
              username: '',
            },
              invalid: false });
          }
        });
    }
  }


  render() {
    const { errors, isLoading, invalid } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign Up</h1>

        <TextFieldGroup
          field="username"
          value={this.state.username}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
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
          <button className="btn btn-primary btn-lg" disabled={isLoading || invalid}>
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  doesUserExist: React.PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default SignupForm;
