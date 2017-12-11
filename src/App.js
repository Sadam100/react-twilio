import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';


class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/home' component={Home}/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
