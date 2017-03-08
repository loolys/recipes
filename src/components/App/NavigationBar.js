import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class NavigationBar extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const username = this.props.auth.user.username;
    const userLinks = (
      <div>
        <Nav>
          <LinkContainer to="/new-recipe">
            <NavItem>Add Recipe</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown title={username} eventKey={1} id="profile-dropdown">
            <LinkContainer to={`/profile/${username}`}>
              <MenuItem eventKey={1.1}>
                Profile
              </MenuItem>
            </LinkContainer>
            <MenuItem eventKey={1.2}>
              <a href="#" onClick={this.logout.bind(this)}>Logout</a>
            </MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );

    const guestLinks = (
      <Nav pullRight>
        <LinkContainer to="/Signup">
          <NavItem>Signup</NavItem>
        </LinkContainer>
        <LinkContainer to="/Login">
          <NavItem>Login</NavItem>
        </LinkContainer>
      </Nav>
    );
    
    const { isAuthenticated } = this.props.auth;
    return (
      <Navbar>
        <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React-Bootstrap</Link>
        </Navbar.Brand>
        </Navbar.Header>
        { isAuthenticated ? userLinks : guestLinks }
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
