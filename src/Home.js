/**
 * Created by Sadam Hussain on 11/30/2017.
 */
import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MobileTearSheet from './MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import NavDrawer from './NavDrawer';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Checkbox from 'material-ui/Checkbox';
import CallIcon from 'material-ui/svg-icons/action/thumb-up';
import {FontIcon, RaisedButton} from "material-ui";
import Dialog from 'material-ui/Dialog';
import helper from './util/helper';
import LoaderComponent from './LoaderComponent';
const appTokenKey = "appToken";
const iconStyles = {
    marginRight: 24,
};
const contentStyle = {
    padding: '20px'
};
const rightDivStyle = {
    float: 'right',
    marginRight: "100px",
};
const leftDivStyle = {
    width: '50%',
    paddingLeft: '40px'
};
const signOutStyle = {
    float: "right"
};
const headingStyle = {
    paddingLeft: '40px'
};
const style = {
    refresh: {
        position: 'relative'
    },
};
const customContentStyle = {
    width: '5%',
    maxWidth: 'none',
};

const dimDiv = {
    background: 'rgba(0,0,0,.5)',
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 999,
}

class Home extends Component {
    constructor(props){
        super(props);
        console.log("42 ",this.props.history);
        this.state = {
            drawerOpened:false,
            logged: true,
            data: [],
            open: true,
            sentOpen:false,
            options: [],
            props: this.props,
            loadingStatus: "loading",
            loadingDialogOpen: true,
            title: "Home",
            contactNotSelected: false,
        };
        this.handleLogout = this.handleLogout.bind(this);
    };
    handleClose = () => {
        this.setState({open: false, contactNotSelected: false, sentOpen: false});
        this.props.history.push("/");
    };

    homeClose = () => {
        this.setState({open: false, contactNotSelected: false, sentOpen: false});
    }

    _sendMessage = (e) => {
        e.preventDefault();
        // console.log("59 ",this.state.selectedUser[0]);
        console.log("65 ",this.state.options);
        if(!this.state.options.length){
            this.setState({
                contactNotSelected: true,
                dialogHeader: "We are Sorry!",
                dialogMessage: "Please Select at least One Contact!"
            });
            return;
        }
        var to = this.state.options;
        var that = this.state;
        var user = JSON.parse(localStorage.getItem("current-user"));
        var from = user.FullName;
        var obj = {
            message: document.getElementById("message").value,
            contact: to,
            from: from
        };
        var promiseObj = helper.sendMessage(obj);
        promiseObj.then(function(success){
            console.log("70 ",success);
            if(success.data.status){
                console.log("Sent");
                this.setState({
                    sentOpen: true,
                    dialogHeader: "Message Sent!",
                    dialogMessage: "Your message has been delivered!"
                });
            }else{
                console.log("Not Sent");
                this.setState({
                    sentOpen: true,
                    dialogHeader: "Message Not Sent!",
                    dialogMessage: "The User number is not verified by Twilio. On a Trail Version Twilio just sent message to verified numbers."
                });
            }

        }.bind(this));
        console.log(obj);
        // console.log(user);
    };
    handleLogout() {
        console.log(this.props);
        localStorage.removeItem(appTokenKey);
        localStorage.removeItem("current-user");
        this.props.history.push("/");
        console.log("user signed out from messagingApp");
    };

    onChange(e) {
        // current array of options
        const options = this.state.options
        let index
        console.log("126 ",e.target.value);
        console.log("127 ",e.target.checked);
        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }
        console.log("135 ",options);

        // update the state with the new array of options
        this.setState({ options: options })
    }
    clearMessageBox(){
        document.getElementById("message").value="";
    }

    selectedUser(userName){
        var selectedUser = []
        console.log(userName.target);
        //console.log(this.state.data);
        // var userData = this.state.data;
        // var currentUser = JSON.parse(localStorage.getItem("current-user"));
        // console.log("62 ", currentUser.FullName);
        // console.log(userData);
        // for (var key in userData) {
        //     if(userName === userData[key].FullName){
        //         selectedUser.push(userData[key]);
        //     }
        // }
        // this.setState({
        //     selectedUser: selectedUser,
        //     currentUserName: currentUser.FullName,
        //     currentUserEmail: currentUser.Email,
        //     isData: true,
        // })
    }
    componentDidMount() {
        this.setState({
            loadingStatus: "loading",
        });
        var users=[];
        var session = localStorage.getItem(appTokenKey);
        var currentUser = JSON.parse(localStorage.getItem("current-user"));
        console.log("78 ",currentUser);
        var obj ={
            Email: currentUser.Email
        }
        var promiseObj = helper.getContactList(obj);
        promiseObj.then(function(data){
            console.log("124 ",data);
            if(data !== "No Contact List!"){
                // for(var i =0;i<data.length;i++){
                //     if(data[i].Email !== currentUser.Email){
                //         users.push(data[i]);
                //     }
                // }
                this.setState({
                    data: data,
                    loadingStatus: "hide",
                    loadingDialogOpen: false,
                    currentUserName: currentUser.FullName,
                    currentUserEmail: currentUser.Email,
                });
            }else{
                this.setState({
                    data: null,
                    loadingStatus: "hide",
                    loadingDialogOpen: false,
                    currentUserName: currentUser.FullName,
                    currentUserEmail: currentUser.Email,
                });
            }
        }.bind(this));
    }
    render () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        const contactNotSelected = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.homeClose}
            />,
        ];
        const isData = this.state.isData;
        const isSent = this.state.isSent;
        const isSession = this.state.session;
        const currentUserName = this.state.currentUserName;
        const currentUserEmail = this.state.currentUserEmail;
        let userData = null;
        let selectedUserBox = null;
        if(this.state.data){
            userData = this.state.data.map((data, i) => {
                return <ListItem key={i}
                                 primaryText={data.FullName}
                                 rightAvatar={<Avatar src={data.ImageURL} />}
                                 leftCheckbox={<Checkbox value={data.Contact} onCheck={this.onChange.bind(this)} />}
                    //onCheck={FullName => this.selectedUser(data.FullName)}
                />
            });
        }else{
            userData = <ListItem>No Contact List</ListItem>;
        }

        if(localStorage.getItem(appTokenKey)){
            return(
                <div>
                    <NavDrawer func={this.state.props} title={this.state.title}/>
                    <div style={contentStyle}>
                        {
                            this.state.loadingStatus === "loading"
                            ?
                                <LoaderComponent status={this.state.loadingStatus}/>
                            :
                                ""
                        }

                        <div style={headingStyle}>
                            <h1>Messenger</h1>
                        </div>
                        <div style={rightDivStyle}>
                            <MobileTearSheet>
                                <List>
                                    <Subheader>Contact List</Subheader>
                                    {userData}
                                </List>
                            </MobileTearSheet>
                        </div>
                        <div style={leftDivStyle}>
                            <Card>
                                 <form onSubmit={(e) => this._sendMessage(e)}>
                                     <CardHeader
                                 />
                                 <CardTitle className="title" value={currentUserName} title={currentUserName} subtitle={currentUserEmail} />
                                 <CardText>
                                     <TextField
                                         id="message"
                                         hintText="Message Field"
                                         floatingLabelText="Text Message"
                                         multiLine={true}
                                         rows={2}
                                     />
                                 </CardText>
                                 <CardActions>
                                     <RaisedButton
                                         type="submit"
                                         label="Send"
                                         primary={true}
                                     />
                                     <RaisedButton onClick={this.clearMessageBox} label="Clear" primary={true} />
                                 </CardActions>
                                 </form>
                                 <Dialog
                                     title={this.state.dialogHeader}
                                     actions={contactNotSelected}
                                     modal={true}
                                     open={this.state.contactNotSelected}
                                 >
                                     {this.state.dialogMessage}
                                 </Dialog>
                                <Dialog
                                    title={this.state.dialogHeader}
                                    actions={actions}
                                    modal={true}
                                    open={this.state.sentOpen}
                                >
                                    {this.state.dialogMessage}
                                </Dialog>
                            </Card>
                        </div>
                    </div>
                </div>
            );
        }else{
            return <div>
                <Dialog
                    title="Unauthorized User!"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    You are not authorized to access this page.
                </Dialog>
            </div>
        }
    }
}

export default Home;