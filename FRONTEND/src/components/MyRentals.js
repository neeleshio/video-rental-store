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
        axios.get('https://video-rental-store--neeleshshetty.repl.co/my-rentals').then(response => {
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
                    <td>{rental.bonus} &#8473;</td>
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
                            <th>Days</th>
                            <th>Paid with Cash</th>
                            <th>Paid with Points</th>
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
