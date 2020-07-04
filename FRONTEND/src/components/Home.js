import React, { Component } from 'react';
import Cards from './Cards'
import { Row, Col } from 'react-bootstrap'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Cards />
                </Row>
            </div>
        )
    }
}

export default Home;