import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Facts extends Component {
  render() {
    const { time, portions, onChange } = this.props;
    return (
      <Grid>
        <div className="form-group">
          <Row>
            <Col md={3} className="facts">
              <label htmlFor="time" className="control-label">Cooking Time(min)</label>
            </Col>
            <Col md={3} className="facts">
              <label htmlFor="Portions" className="control-label">Portions</label>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="facts">
              <input
                className="number-input"
                name="time"
                value={time}
                type="number"
                onChange={onChange}
                min="0"
                max="1000"
              />
            </Col>
            <Col md={3} className="facts">
              <input
                className="number-input"
                name="portions"
                value={portions}
                type="number"
                onChange={onChange}
                min="0"
                max="1000"
              />
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
}

Facts.propTypes = {
  time: React.PropTypes.string.isRequired,
  portions: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default Facts;
