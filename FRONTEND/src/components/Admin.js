import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './styles/Dashboard.scss'

class Dashboard extends Component {
    state = {
        films: [],
        show: false,
        editFilm: {
            id: '',
            type: ''
        }
    }

    //Returns all films in the inventory on load
    componentDidMount() {
        axios.get('http://localhost:5000/admin').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    //Returns all films in the inventory on click
    all = () => {
        axios.get('http://localhost:5000/admin').then(response => {
            this.setState({
                films: response.data
            })
        })
    }

    //Returns only available(not rented) films
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

    //Populates the info of the selected item
    editFilm(id, type) {
        this.handleShow()
        this.setState({
            editFilm: { id, type }
        })
    }

    //OnClick updates the type 
    updateFilm = () => {
        axios.patch('http://localhost:5000/admin/type/id', this.state.editFilm).then(response => {
            this.all();
            this.handleClose()
        }).catch(err => {
            console.log(err)
        })

    }

    //Renders all returned data on the webpage
    render() {
        //Map object helps getting indivisual values
        let films = this.state.films.map(film => {
            return (
                <tr key={film.id}>
                    <td>{film.name}</td>
                    <td>{film.type}</td>
                    <td>{film.price} &#8377;</td>
                    <td>
                        <Button variant="outline-success" onClick={this.editFilm.bind(this, film._id, film.type)}>Edit</Button>{' '}
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

                {/* Edit modal form */}
                <div className="modal-container">
                    <Modal show={this.state.show} onHide={this.handleClose} centered size="sm">
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
                            <Button variant="secondary" onClick={this.handleClose} size="sm">Cancel</Button>
                            <Button variant="primary" onClick={this.updateFilm} size="sm">Save Changes</Button>
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