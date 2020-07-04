import React, { Component } from 'react';
import Navigation from './components/Navbar';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admin" component={Dashboard} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;