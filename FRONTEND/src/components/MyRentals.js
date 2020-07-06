import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './styles/MyRentals.scss'

class MyRentals extends Component {
    state = {
        rentals: [],
        total: '0'
    }

    //Returnes users rentals on load
    componentDidMount() {
        axios.get('http://localhost:5000/my-rentals').then(response => {
            this.setState({
                rentals: response.data
            })
        })
    }

    render() {
        //Map object helps getting indivisual values
        let rentals = this.state.rentals.map(rental => {
            return (
                <tr key={rental.id}>
                    <td>{rental._id}</td>
                    <td>{rental.filmName}</td>
                    <td>{rental.type}</td>
                    <td>{rental.days} days</td>
                    <td>{rental.total} &#8377;</td>
                </tr>
            )
        })

        //My rentals table.
        return (
            <div className="table-container">
                <div className="h1-container">
                    <h1>Your Rentals</h1>
                </div>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Movie</th>
                            <th>Type</th>
                            <th>days</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals}
                    </tbody>
                </Table>
                <div className="total">
                    <h2>Total: {this.state.total} &#8377;</h2>
                </div>
            </div>
        )
    }
}

export default MyRentals;
