import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import './styles/Navbar.scss'

class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand >
                    <Link to="/" style={{ "textDecoration": "none" }} className="logo">
                        <span>V</span>ideo Rental Store
                    </Link>
                </Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Nav.Link><Link to="/my-rentals" style={{ "textDecoration": "none" }} className="admin">My Rentals </Link></Nav.Link>
                    <Nav.Link><Link to="/admin" style={{ "textDecoration": "none" }} className="admin">Admin </Link></Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;
