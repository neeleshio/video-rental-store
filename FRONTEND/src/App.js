import React, { Component } from 'react';
import Navigation from './components/Navbar';
import Admin from './components/Admin';
import Home from './components/Home';
import MyRentals from './components/MyRentals'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navigation />  {/*Common for all the pages*/}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/my-rentals" component={MyRentals} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;