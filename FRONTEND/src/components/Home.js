import React, { Component } from 'react';
import './styles/Home.scss';
import { Row, Modal, Button, Form, Card, CardGroup, Col } from 'react-bootstrap'
import axios from 'axios';

class Home extends Component {
    state = {
        films: [],
        show: false,
        isChecked: false,
        dispayBonus: false,
        isBonusChecked: false,
        newOrder: {
            id: '',
            name: '',
            type: '',
            price: '',
            total: '0'
        },
        isAvailable: false,
        showConfo: false,
        bonusAvailable: '',
        user: '',
        days: '',
        bonusRequired: '0'
    }

    //Returns all films & user info
    componentDidMount() {
        axios.get('https://video-rental-store--neeleshshetty.repl.co/admin').then(response => {
            this.setState({
                films: response.data
            })
        });
        axios.get('https://video-rental-store--neeleshshetty.repl.co/user').then(response => {
            this.setState({
                user: response.data[0]._id,
                bonusAvailable: response.data[0].bonusPoints
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

    handleCloseConfo = () => {
        window.location.reload()
        this.setState({ showConfo: false })
    }


    isChecked = (e) => { this.setState({ isChecked: !this.state.isChecked }) }
    isBonusChecked = () => { this.setState({ isBonusChecked: !this.state.isBonusChecked }) }

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

        if (this.state.newOrder.type === 'New Release') {
            this.setState({
                displayBonus: true,
                bonusRequired: e.target.value * 25
            })
        }

        console.log(this.state)

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

    //Passes new order info
    postOrder = () => {
        let data = {
            id: this.state.newOrder.id,
            name: this.state.newOrder.name,
            type: this.state.newOrder.type,
            days: this.state.days,
            total: this.state.bonusRequired === '0' ? this.state.total : '0',
            isAvailable: this.state.isAvailable,
            bonusAvailable: this.state.newOrder.type === 'New Release' ? (((this.state.bonusAvailable) + 2) - this.state.bonusRequired) : (this.state.bonusAvailable) + 1,
            user: this.state.user,
            bonusRequired: this.state.bonusRequired
        }

        //Saves the new order info to the DB and refreshes once order is successful
        //Returns the updated bonus points
        if (this.state.days.length > 0) {
            axios.post('https://video-rental-store--neeleshshetty.repl.co/new-order', data).then(response => {

                axios.patch('https://video-rental-store--neeleshshetty.repl.co/admin/id', data).then(response => {
                    console.log(response)
                    this.handleClose()
                    this.handleShowConfo()

                    axios.patch('https://video-rental-store--neeleshshetty.repl.co/user', data).then(response => {
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
                            <hr />

                            {this.state.displayBonus ?
                                <div className="bonus-container">
                                    <input type="checkbox" disabled={!(this.state.bonusRequired <= this.state.bonusAvailable)} onClick={this.isBonusChecked} />
                                    <label for="tc" style={{ 'padding-left': 10 }}> Proceed with bonus points 25&#8473;/day </label>
                                    <p>Required: {this.state.bonusRequired}&#8473;</p>
                                    <p>Available: {this.state.bonusAvailable}&#8473;</p>
                                </div> : ''
                            }

                            <hr />
                            <h3>Sub Total: {this.state.isBonusChecked ? '0' : this.state.total} &#8377;</h3>
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
                                <p>{this.state.newOrder.name}({this.state.newOrder.type}) - {this.state.days}days</p>

                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )

    }
}

export default Home;