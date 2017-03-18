import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { IndexLink } from 'react-router';
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
          <NavDropdown title={username ? username : ''} eventKey={1} id="profile-dropdown">
            <LinkContainer to={`/profile/${username}`}>
              <MenuItem>
                Profile
              </MenuItem>
            </LinkContainer>
            <LinkContainer to={`/profile/saved/${username}`}>
              <MenuItem>
                Saved Recipes
              </MenuItem>
            </LinkContainer>
            <MenuItem onClick={this.logout.bind(this)}>
              Logout
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
      <Navbar className="navbar-no-margin">
        <Navbar.Header>
          <IndexLink to="/">
            <Image className="logo-img" src="/recipe-logo.png" />
          </IndexLink>
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
