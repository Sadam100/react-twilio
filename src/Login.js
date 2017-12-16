/**
 * Created by Sadam Hussain on 11/30/2017.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FontIcon, RaisedButton} from "material-ui";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LoaderComponent from './LoaderComponent';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import helper from './util/helper';

const appTokenKey = "appToken";

const textFieldStyle = {
    display: 'block',
    width: '100%'
};
const loginStyle={
    textAlign: "center"
};
const buttonStyle = {
    marginTop: '20px'
};
const iconStyles = {
    color: "#ffffff"
};
const contentStyle = {
    padding: '20px',
    width: "30%",
    margin: "auto"
};
const style = {
    refresh: {
        position: 'relative'
    },
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false,
            loadingStatus: "hide",
            emailNotEntered:false,
        };

        //this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }
    handleClose = () => {
        this.setState({emailNotEntered: false});
        this.props.history.push("/");
    };

    componentWillMount() {

        if (localStorage.getItem(appTokenKey)) {
            this.props.history.push("/home");
            return;
        }
    }

    _sendForm(e) {
        e.preventDefault();
        var obj = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
        if(obj.email == "" || obj.password == ""){
            //alert("Please Enter Email and Password!");
            this.setState({
                emailNotEntered: true,
                dialogHeader: "We are Sorry!",
                dialogMessage: "Please Enter Email and Password!"
            });
            return;
        }
        this.setState({
            loadingStatus: "loading"
        });
        console.log(obj);
        var that = this;
        var promiseObj = helper.signIn(obj);
        promiseObj.then(function(data){
            console.log("50 ",data.data);
            var token = data.data.token;
            var udata = data.data.user;
            localStorage.setItem(appTokenKey, token);
            localStorage.setItem("current-user", JSON.stringify(udata));
            that.props.history.push("/home");
        });
    };
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div style={contentStyle}>
                {
                    this.state.loadingStatus === "loading"
                        ?
                        <LoaderComponent status={this.state.loadingStatus}/>
                        :
                        ""
                }
                <h1 style={loginStyle}>Login</h1>

                <MuiThemeProvider>
                    <form onSubmit={(e) => this._sendForm(e)}>
                        <TextField
                            id="email"
                            type="email"
                            style={textFieldStyle}
                            floatingLabelText="Email"
                        />
                        <TextField
                            id="password"
                            type="password"
                            style={textFieldStyle}
                            floatingLabelText="Password"
                        />
                        <RaisedButton type="submit" fullWidth={true}
                                      label="Sign In" style={buttonStyle}
                                      backgroundColor="#dd4b39"
                                      labelColor={"#ffffff"}
                                      icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
                            //onClick={handleGoogleLogin}
                        />
                        <RaisedButton type="submit" fullWidth={true}
                                      href="/signup"
                                      label="Sign Up" style={buttonStyle}
                                      backgroundColor="#dd4b39"
                                      labelColor={"#ffffff"}
                                      icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
                        />
                    </form>
                </MuiThemeProvider>
                <Dialog
                    title={this.state.dialogHeader}
                    actions={actions}
                    modal={true}
                    open={this.state.emailNotEntered}
                >
                    {this.state.dialogMessage}
                </Dialog>
                {/*<RefreshIndicator*/}
                    {/*size={50}*/}
                    {/*left={200}*/}
                    {/*top={50}*/}
                    {/*loadingColor="#FF9800"*/}
                    {/*status={this.state.loadingStatus}*/}
                    {/*style={style.refresh}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default Login;