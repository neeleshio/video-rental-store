import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './styles/Dashboard.scss'

class Dashboard extends React.Component {
    state = {
        films: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/admin/all').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    render() {
        let films = this.state.films.map(film => {
            return (
                <tr key={film.id}>
                    <td>{film.name}</td>
                    <td>{film.type}</td>
                    <td>{film.price} &#8364;</td>
                    <td>
                        <Button color="success" size="sm">Edit</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <div className="button-container">
                    <Button variant="outline-primary" className="mr-2">All Movies</Button>{' '}
                    <Button variant="outline-secondary">Available</Button>{' '}
                </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Dashboard;