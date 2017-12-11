/**
 * Created by Sadam Hussain on 12/1/2017.
 */
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
const appTokenKey = "appToken";
const iconStyles = {
    marginRight: 24,
};

class NavDrawer extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            drawerOpened:false,
            logged: true
        };
        this.handleLogout = this.handleLogout.bind(this);
    };
    handleLogout() {
        console.log(this.props);
        localStorage.removeItem(appTokenKey);
        this.props.func.history.push("/");
        console.log("user signed out from messagingApp");

    };
    _toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        });
    };
    render () {
        return(
            <div>
                <AppBar
                    title="Home"
                    onLeftIconButtonTouchTap={() => this._toggleDrawer()}
                    iconElementRight={<FlatButton label="Sign Out" onClick={this.handleLogout} />}
                />
                <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={() => this._toggleDrawer()}>
                    <List>
                        <ListItem leftIcon={<FontIcon className="muidocs-icon-action-home" style={iconStyles}/>}><Link to='/'>Home</Link></ListItem>
                        <ListItem leftIcon={<FontIcon className="muidocs-icon-action-home" style={iconStyles}/>}><Link to='/blog'>Friend Search</Link></ListItem>
                        <ListItem leftIcon={<FontIcon className="muidocs-icon-action-home" style={iconStyles}/>}><Link to='/about'>About</Link></ListItem>
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default NavDrawer;