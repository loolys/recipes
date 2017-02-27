import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../validators/login';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (isValid) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        () => this.context.router.push('/'),
        err => this.setState({ errors: err.response.data.errors, isLoading: false }),
      );
    } else {
      this.setState({ errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { username, password, errors, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="username"
          label="Username"
          type="text"
          value={username}
          error={errors.username}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          type="password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
        />

        <div className="form-group">
          <button disabled={isLoading} className="btn btn-primary btn-lg">
            Login
          </button>
        </div>
      </form>

    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginForm);
