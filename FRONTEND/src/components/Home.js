import React, { Component } from 'react';
import './styles/Home.scss';
import { Row, Modal, Button, Form, Card, CardGroup, Col } from 'react-bootstrap'
import axios from 'axios'

class Home extends React.Component {
    state = {
        films: [],
        show: false,
        isChecked: false,
        newOrder: {
            total: '0.00'
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/admin').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    handleShow = () => this.setState({ show: true })

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    isChecked = (e) => {
        this.setState({ isChecked: !this.state.isChecked })
        console.log(this.state)
    }


    render() {
        let films = this.state.films.map(film => {
            return (
                <div className="cards">
                    <Col>
                        <CardGroup>
                            <Card style={{ width: '15rem' }} className="text-center">
                                < Card.Body key={film.id} >
                                    <Card.Img variant="top" src={film.imageUrl} />
                                    <Card.Title>{film.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{film.type}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Price: {film.price}&#8364;</Card.Subtitle>
                                    <Button variant="primary" disabled={!film.isAvailable} className="btn" onClick={this.handleShow} size="sm">{film.isAvailable ? 'Rent' : 'Not Available'}</Button>{' '}
                                </Card.Body >
                            </Card>
                        </CardGroup>
                    </Col>
                </div>
            )
        })

        return (
            <div>
                <Row>{films}</Row>

                <div className="modal-container">
                    <Modal show={this.state.show} onHide={this.handleClose} centered size="sm">
                        <Modal.Header closeButton>
                            <Modal.Title>New Rental</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                <p>Movie: </p>
                                <p>Type: </p>
                                <p>Price: </p>
                            </div>
                            <Form size="sm">
                                <Form.Label className="label">How many days?</Form.Label>
                                <Form.Control type="text" placeholder="ex: 2" />
                            </Form>

                            <hr />
                            <h3>Sub Total: {this.state.newOrder.total}</h3>
                            <br />
                            <div>
                                <input type="checkbox" onChange={this.isChecked} />
                                <label for="tc"> I accecpt terms & conditions </label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" disabled={!this.state.isChecked} size="sm">Place Order</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )

    }
}


export default Home;