import React, { Component } from 'react';
import classnames from 'classnames';

class TextFieldGroup extends Component {
  render() {
    const { field, value, label, onChange, type, error } = this.props;
    return (
      <div className={classnames('form-group', { 'has-error': error })}>
        <label className="control-label">{label}</label>
        <input
          value={value}
          onChange={onChange}
          type={type}
          name={field}
          className="form-control"
        />
        { error ? <span className="help-block">{error}</span> : '' }
      </div>
    );
  }
}

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  type: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
};

TextFieldGroup.defaultProps = {
  type: 'text',
  error: '',
};

export default TextFieldGroup;
