import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class StepsList extends Component {
  render() {
    const { changeStep, removeStep, steps } = this.props;
    return (
      <div>
        {steps.map((step, index) => {
          return (
            <div className="form-group" key={index}>
              {index + 1 + '.'}
              <textarea
                className="step-area"
                onChange={changeStep(index)}
                name="text"
                value={step.text}
                cols="51"
                rows="3"
              />
              <Button
                onClick={removeStep(index)}
                bsSize="xsmall"
              >
                x
            </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

StepsList.propTypes = {
  changeStep: React.PropTypes.func.isRequired,
  removeStep: React.PropTypes.func.isRequired,
  steps: React.PropTypes.object.isRequired,
};

export default StepsList;
