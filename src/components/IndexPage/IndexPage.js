import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import { getFeatured } from '../../actions/recipeActions';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.props.getFeatured()
    .then((res) => this.setState({ data: res.data.found }));
  }
  render() {
    console.log(this.state);
    return (
      <div><Image src={this.state.data.image} /></div>
    );
  }
}

IndexPage.propTypes = {
  getFeatured: React.PropTypes.func.isRequired,
};

export default connect(null, { getFeatured })(IndexPage);
