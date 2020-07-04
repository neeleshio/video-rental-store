import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Dropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './styles/Dashboard.scss'

class Dashboard extends React.Component {
    state = {
        films: [],
        show: false,
        editFilm: {
            id: '',
            type: ''
        }
    }



    componentDidMount() {
        axios.get('http://localhost:5000/admin').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    all = () => {
        axios.get('http://localhost:5000/admin').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    available = () => {
        axios.get('http://localhost:5000/admin/available').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    editFilm(id, type) {
        this.handleShow()
        this.setState({
            editFilm: { id, type }
        })
    }

    updateFilm = () => {
        axios.patch('http://localhost:5000/admin/id', this.state.editFilm).then(response => {
            this.all();
            this.handleClose()
        }).catch(err => {
            console.log(err)
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
                        <Button variant="outline-success" onClick={this.editFilm.bind(this, film._id, film.type)}>Edit</Button>{' '}
                        <Button variant="outline-danger">Delete</Button>{' '}
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <div className="button-container">
                    <Button variant="outline-primary" className="mr-2" onClick={this.all}>All Movies</Button>{' '}
                    <Button variant="outline-primary" onClick={this.available} >Available</Button>{' '}
                </div>

                <div className="modal-container">
                    <Modal show={this.state.show} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Type</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="dropdown-conmtainer">
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Select type</Form.Label>
                                        <Form.Control as="select" custom value={this.state.editFilm.type} onChange={(e) => {
                                            let { editFilm } = this.state;

                                            editFilm.type = e.target.value;

                                            this.setState({ editFilm })
                                            console.log(editFilm.id)
                                        }}>
                                            <option>New Release</option>
                                            <option>Regular</option>
                                            <option>Old</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button variant="primary" onClick={this.updateFilm}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Action</th>
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