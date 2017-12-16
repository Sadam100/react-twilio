/**
 * Created by Sadam Hussain on 12/13/2017.
 */
/**
 * Created by Sadam Hussain on 11/30/2017.
 */
import React, { Component } from 'react';
import NavDrawer from './NavDrawer';
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
const CLOUDINARY_UPLOAD_PRESET = 'woa1ui5l';
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

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false,
            loadingStatus: "hide",
            loadingDialogOpen: false,
            props: this.props,
            title: "About",
        };

        //this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    render() {
        return(
            <div>
                <NavDrawer func={this.state.props} title={this.state.title}/>
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
                    <h1 style={signUpStyle}>About</h1>
                </div>
            </div>

        );
    }
}

export default About;