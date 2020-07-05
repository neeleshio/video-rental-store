import React, { Component } from 'react';
import './styles/Home.scss';
import { Row, Modal, Button, Form, Card, CardGroup, Col } from 'react-bootstrap'
import axios from 'axios';



class Home extends React.Component {
    state = {
        films: [],
        show: false,
        isChecked: false,
        newOrder: {
            id: '',
            name: '',
            type: '',
            price: '',
            days: '0'
        },
        total: '0'
    }

    componentDidMount() {
        axios.get('http://localhost:5000/admin').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    handleShow = () => {
        this.setState({ show: true })

    }
    handleClose = () => {
        this.setState({ show: false })

    }


    isChecked = (e) => {
        this.setState({ isChecked: !this.state.isChecked })

    }

    newOrder = (id, name, type, price) => {
        this.handleShow()
        this.setState({
            newOrder: { id, name, type, price },
        })
    }

    onChange = (e) => {
        if (this.state.newOrder.type === 'New Release') {
            this.setState({
                total: e.target.value * this.state.newOrder.price,
                days: e.target.value
            })
        }

        if (this.state.newOrder.type === 'Old' && e.target.value < 4) {
            this.setState({
                total: this.state.newOrder.price,
                days: e.target.value
            })
        }

        if (this.state.newOrder.type === 'Old' && e.target.value > 3) {
            this.setState({
                total: (e.target.value - 2) * this.state.newOrder.price,
                days: e.target.value
            })
        }

        if (this.state.newOrder.type === 'Regular' && e.target.value < 6) {
            this.setState({
                total: this.state.newOrder.price,
                days: e.target.value
            })
        }

        if (this.state.newOrder.type === 'Regular' && e.target.value > 5) {
            this.setState({
                total: (e.target.value - 4) * this.state.newOrder.price,
                days: e.target.value
            })
        }

        console.log(this.state)
    }

    console = () => {
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

                                    <div>
                                        <Button variant="primary"
                                            disabled={!film.isAvailable}
                                            className="btn"
                                            onClick={this.newOrder.bind(this, film._id, film.name, film.type, film.price)}
                                            size="sm">
                                            {film.isAvailable ? 'Rent' : 'Not Available'}
                                        </Button>{' '}
                                    </div>

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
                                <p>Movie: <strong>{this.state.newOrder.name}</strong></p>
                                <p>Type: <strong>{this.state.newOrder.type}</strong></p>
                                <p>Price: <strong>{this.state.newOrder.price} &#8364;</strong></p>
                            </div>
                            <Form size="sm">
                                <Form.Label className="label">How many days?</Form.Label>
                                <Form.Control type="text" placeholder="ex: 2" onChange={this.onChange} />
                            </Form>
                            <p>{this.state.message}</p>
                            <hr />
                            <h3>Sub Total: {this.state.total} &#8364;</h3>
                            <br />
                            <div>
                                <input type="checkbox" onChange={this.isChecked} />
                                <label for="tc"> I accecpt terms & conditions </label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" disabled={!this.state.isChecked} onClick={this.console} size="sm">Place Order</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )

    }
}


export default Home;