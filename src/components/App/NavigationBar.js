import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

class NavigationBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React-Bootstrap</Link>
        </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to="/Signup">
            <NavItem>Signup</NavItem>
          </LinkContainer>
          <LinkContainer to="/Login">
            <NavItem>Login</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}
export default NavigationBar;
