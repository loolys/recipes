import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.context.router.push({
      pathname: '/search-results',
      query: { search: this.state.search },
    });
  }

  render() {
    return (
      <div>
        <Navbar inverse>
          <Nav className="make-wide">
            <NavItem className="make-wide">
              <form className="form-inline" onSubmit={this.onSubmit}>
                <input
                  className="search-box dark-font"
                  name='search'
                  type="text" name="search"
                  placeholder="Search For Recipes..."
                  value={this.state.search}
                  onChange={this.onChange}
                />
              </form>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

SearchBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default SearchBar;
