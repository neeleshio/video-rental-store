import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import axios from 'axios'
import './styles/Navbar.scss'

class Navigation extends Component {
    state = { user: '' }

    //Returnes user info on load
    componentDidMount() {
        axios.get('http://localhost:5000/user').then(response => {

            this.setState({
                user: response.data[0]
            })
        }).catch(err => {
            console.log(err)
        })
    }

    //Renders returned data on the webpage
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

                    <Nav.Link>
                        <Link to=""
                            style={{ "textDecoration": "none" }}
                            className="admin">Bonus Points: <b>{this.state.user.bonusPoints}&#8473;</b>
                        </Link>
                    </Nav.Link>

                    <Nav.Link><Link to="/my-rentals" style={{ "textDecoration": "none" }} className="admin">My Rentals </Link></Nav.Link>
                    <Nav.Link><Link to="/admin" style={{ "textDecoration": "none" }} className="admin">Admin </Link></Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;
