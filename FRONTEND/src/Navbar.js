import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'

class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" ><span style={{ 'color': '#ADFF2F' }}>V</span>ideo Rental Store</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Nav.Link eventKey={2} href="#admin">Admin</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation
