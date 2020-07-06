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
            total: '0'
        },
        isAvailable: false,
        showConfo: false,
        bonusPoints: '',
        user: '',
        days: ''
    }

    //Returns all films & user info
    componentDidMount() {
        axios.get('http://localhost:5000/admin').then(response => {
            this.setState({
                films: response.data
            })
        });
        axios.get('http://localhost:5000/user').then(response => {
            this.setState({
                user: response.data[0]._id,
                bonusPoints: response.data[0].bonusPoints
            })
        })
    }

    //Handle for new order form
    handleShow = () => { this.setState({ show: true }) }

    handleClose = () => {
        this.setState({ show: false })
        this.setState({
            total: '0',
            isChecked: false
        })
    }

    //Handle for order confirmation form
    handleShowConfo = () => { this.setState({ showConfo: true }) }

    handleCloseConfo = () => { this.setState({ showConfo: false }) }


    isChecked = (e) => { this.setState({ isChecked: !this.state.isChecked }) }

    //Populates film info and user info
    newOrder = (id, name, type, price, user) => {
        this.handleShow()
        this.setState({
            newOrder: { id, name, type, price, user },
            total: '0'
        })
    }

    onChange = (e) => {

        //Price calulation statements based on type of film and rental days
        this.setState({
            total: e.target.value * this.state.newOrder.price,
            days: e.target.value
        })

        if (this.state.newOrder.type === 'Regular' && e.target.value < 4 && e.target.value > 0) {
            this.setState({
                total: this.state.newOrder.price,
                days: e.target.value
            })
        }

        if (this.state.newOrder.type === 'Regular' && e.target.value > 3) {
            this.setState({
                total: (e.target.value - 2) * this.state.newOrder.price,
                days: e.target.value
            })
        }


        if (this.state.newOrder.type === 'Old' && e.target.value < 6 && e.target.value > 0) {
            this.setState({
                total: this.state.newOrder.price,
                days: e.target.value
            })
        }

        if (this.state.newOrder.type === 'Old' && e.target.value > 5) {
            this.setState({
                total: (e.target.value - 4) * this.state.newOrder.price,
                days: e.target.value
            })
        }

        //Sets subtotal to zero when day input is zero
        if (e.target.value === '0') {
            this.setState({
                total: '0'
            })
        }
    }

    //Pushes new order info to the DB
    postOrder = () => {
        let data = {
            id: this.state.newOrder.id,
            name: this.state.newOrder.name,
            type: this.state.newOrder.type,
            days: this.state.days,
            total: this.state.total,
            isAvailable: this.state.isAvailable,
            bonusPoints: (this.state.bonusPoints) + 1,
            user: this.state.user
        }

        //Carries the new order info to the DB and refreshes once order is successful
        //Returns the updated bonus points
        if (this.state.days.length > 0) {
            axios.post('http://localhost:5000/new-order', data).then(response => {

                axios.patch('http://localhost:5000/admin/id', data).then(response => {
                    console.log(response)
                    this.handleClose()
                    this.handleShowConfo()
                    window.location.reload()

                    axios.patch('http://localhost:5000/user', data).then(response => {
                        console.log(response)
                    }).catch(err => {
                        console.log(err)
                    })

                }).catch(err => {
                    console.log(err)
                })
                console.log(response)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        //Map object helps getting indivisual values
        let films = this.state.films.map(film => {

            const user = this.state.user
            return (
                <div className="cards">
                    {/* Cards markup for populating films info */}
                    <Col>
                        <CardGroup>
                            <Card style={{ width: '15rem' }} className="text-center">
                                < Card.Body key={film.id} >
                                    <Card.Img variant="top" src={film.imageUrl} />
                                    <Card.Title>{film.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{film.type}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Price: {film.price}&#8377;</Card.Subtitle>

                                    <div>
                                        <Button variant="primary"
                                            disabled={!film.isAvailable}
                                            className="btn"
                                            onClick={this.newOrder.bind(this, film._id, film.name, film.type, film.price, user)}
                                            size="sm">
                                            {film.isAvailable ? 'Rent' : 'Sold Out'}
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

                {/* New Order modal form markup */}
                <div className="modal-container">
                    <Modal show={this.state.show} onHide={this.handleClose} centered size="sm">
                        <Modal.Header closeButton>
                            <Modal.Title>New Rental</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                <p>Movie: <strong>{this.state.newOrder.name}</strong></p>
                                <p>Type: <strong>{this.state.newOrder.type}</strong></p>
                                <p>Price: <strong>{this.state.newOrder.price} &#8377;</strong></p>
                            </div>

                            <Form size="sm">
                                <Form.Label className="label">How many days?</Form.Label>
                                <Form.Control type="text" placeholder="ex: 2" onChange={this.onChange} />
                            </Form>

                            <p>{this.state.message}</p>
                            <hr />
                            <h3>Sub Total: {this.state.total} &#8377;</h3>
                            <br />
                            <div>
                                <input type="checkbox" onChange={this.isChecked} />
                                <label for="tc" style={{ 'padding-left': 10 }}> I accecpt terms & conditions </label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" disabled={!this.state.isChecked} onClick={this.postOrder} size="sm">Place Order</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                {/* Order Confirmation modal markup */}
                <div className="modal2-container">
                    <Modal show={this.state.showConfo} onHide={this.handleCloseConfo} centered size="sm">
                        <Modal.Header closeButton>
                            <Modal.Title>Order Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <h4>Successful &#x2713;</h4>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )

    }
}

export default Home;