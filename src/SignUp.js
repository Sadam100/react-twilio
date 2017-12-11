/**
 * Created by Sadam Hussain on 11/30/2017.
 */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {FontIcon, RaisedButton} from "material-ui";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import helper from './util/helper';
const appTokenKey = "appToken";
const textFieldStyle = {
    display: 'block',
    width: '100%'
};
const signUpStyle={
    textAlign: "center"
};
const contentStyle = {
    padding: '20px',
    width: "30%",
    margin: "auto"
};
const buttonStyle = {
    marginTop: '20px'
};
const iconStyles = {
    color: "#ffffff"
};
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        display: 'flex',
        flexWrap: 'nowrap',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
    refresh: {
        position: 'relative'
    },
};

const customContentStyle = {
    width: '5%',
    maxWidth: 'none',
};

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false,
            loadingStatus: "hide",
            loadingDialogOpen: false,
        };

        //this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }
    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    _sendForm(e) {
        e.preventDefault();
        console.log("file ", this.state.file);
        if(!this.state.file){
            alert("Please Upload Image!");
            return;
        }
        var image64baseStr = "";
        var that = this;
        var reader = new FileReader();
        this.setState({
            loadingStatus: "loading",
            loadingDialogOpen: true,
        });
        try{
            reader.readAsDataURL(this.state.file);
            reader.onload = function () {
                image64baseStr = reader.result;
                var userObj = {
                    full_name: document.getElementById("fullname").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    contact: document.getElementById("contact").value,
                    image: image64baseStr
                };
                console.log(userObj);
                var promiseObj = helper.addUser(userObj);
                promiseObj.then(function(data){
                    console.log("50 ",data);
                    var token = data.data.token;
                    var udata = data.data.user;
                    localStorage.setItem(appTokenKey, token);
                    localStorage.setItem("current-user", JSON.stringify(udata));
                    that.props.history.push("/home");
                });
            };
        }catch (e){image64baseStr = null;}

    };

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if(imagePreviewUrl){
            $imagePreview =
            <GridList style={styles.gridList} cols={2.2}>
                    <GridTile
                        key={"1"}
                        actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                        titleStyle={styles.titleStyle}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    >
                        <img src={imagePreviewUrl} />
                    </GridTile>
                </GridList>
        }
        return(
            <div style={contentStyle}>
                <Dialog
                    modal={false}
                    open={this.state.loadingDialogOpen}
                    contentStyle={customContentStyle}
                >
                    <RefreshIndicator
                        size={50}
                        left={-10}
                        top={0}
                        loadingColor="#FF9800"
                        status={this.state.loadingStatus}
                        style={styles.refresh}
                    />
                </Dialog>
                <h1 style={signUpStyle}>Sign Up</h1>
                <form onSubmit={(e) => this._sendForm(e)}>
                    <TextField
                        id="fullname"
                        type="fullname"
                        style={textFieldStyle}
                        floatingLabelText="Full Name"
                    />
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
                    <TextField
                        id="contact"
                        type="contact"
                        style={textFieldStyle}
                        floatingLabelText="Contact"
                    />
                    <RaisedButton
                        label="Choose an Image"
                        labelPosition="before"
                        style={styles.button}
                        containerElement="label"
                        onChange={(e)=>this._handleImageChange(e)}
                    >
                        <input type="file" style={styles.exampleImageInput} />
                    </RaisedButton>
                    <div style={styles.root}>
                        {$imagePreview}
                    </div>
                    <RaisedButton type="submit" fullWidth={true}
                                  label="Submit" style={buttonStyle}
                                  backgroundColor="#dd4b39"
                                  labelColor={"#ffffff"}
                                  icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
                        //onClick={handleGoogleLogin}
                    />
                </form>
            </div>
        );
    }
}

export default SignUp;