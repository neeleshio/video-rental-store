import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './styles/Login.scss'

class Login extends Component {
    state = {
        username: ''
    }

    handleChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    validate = (e) => {
        if (!this.state.username) {
            return false
        }

        return true
    }

    submitHandle = (e) => {
        e.preventDefault();
        const isValid = this.validate()
        if (isValid) {
            console.log(this.state)
        }
    }

    render() {
        return (
            <div className="form-container">
                <Form onSubmit={this.submitHandle}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login;
