import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './styles/MyRentals.scss'

class MyRentals extends Component {
    state = {
        rentals: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rentals').then(response => {
            this.setState({
                rentals: response.data
            })
        })
    }
    render() {
        let rentals = this.state.rentals.map(rental => {
            return (
                <tr key={rental.id}>
                    <td>{rental.movie}</td>
                    <td>{rental.type}</td>
                    <td>{rental.timeline} days</td>
                    <td>{rental.price} &#8377;</td>
                </tr>
            )
        })

        return (
            <div>
                <div className="h1-container">
                    <h1>Your Rentals</h1>
                </div>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Movie</th>
                            <th>Type</th>
                            <th>Timeline</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default MyRentals;
