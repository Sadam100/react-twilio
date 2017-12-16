/**
 * Created by Sadam Hussain on 12/1/2017.
 */
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import HomeIcon from 'material-ui/svg-icons/action/home';
import SearchIcon from 'material-ui/svg-icons/action/search';
import InfoIcon from 'material-ui/svg-icons/action/info';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
const appTokenKey = "appToken";
const iconStyles = {
    marginRight: 24,
};

class NavDrawer extends Component {
    constructor(props){
        super(props);
        this.state = {
            drawerOpened:false,
            logged: true,
            title:this.props.title,
        };
        this.handleLogout = this.handleLogout.bind(this);
    };
    handleLogout() {
        console.log(this.props);
        localStorage.removeItem(appTokenKey);
        this.props.func.history.push("/");
        console.log("user signed out from messagingApp");

    };
    Navigate(link){
        this.props.func.history.push(link);
    }
    _toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        });
    };
    render () {

        return(
            <div>
                <AppBar
                    title={this.state.title}
                    onLeftIconButtonTouchTap={() => this._toggleDrawer()}
                    iconElementRight={<FlatButton label="Sign Out" onClick={this.handleLogout} />}
                />
                <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={() => this._toggleDrawer()}>
                        <MenuItem leftIcon={<HomeIcon color="black"/>} onClick={link => this.Navigate("/")}>Home</MenuItem>
                        <MenuItem leftIcon={<SearchIcon color="black"/>} onClick={link => this.Navigate('/search_contacts')}>Search Contacts</MenuItem>
                        <MenuItem leftIcon={<InfoIcon color="black"/>} onClick={link => this.Navigate('/about')}>About</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default NavDrawer;