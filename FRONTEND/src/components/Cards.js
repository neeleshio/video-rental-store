import React, { Component } from 'react';
import './styles/Cards.scss';
import { Card, Button, CardGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios'

class Cards extends React.Component {
    state = {
        films: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/admin').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    render() {
        let films = this.state.films.map(film => {
            return (
                <div className="cards">
                    <Col>
                        <CardGroup>
                            <Card style={{ width: '15rem' }} className="text-center">
                                < Card.Body key={film.id} >
                                    <Card.Title>{film.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{film.type}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Price: {film.price}&#8364;</Card.Subtitle>
                                    <Button variant="primary" className="btn">Rent</Button>{' '}
                                </Card.Body >
                            </Card>
                        </CardGroup>
                    </Col>
                </div>
            )
        })

        return (
            <Row>{films}</Row>
        )

    }
}

export default Cards;