/**
 * Created by Sadam Hussain on 12/11/2017.
 */
import React, { Component } from 'react';
import NavDrawer from './NavDrawer';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Added from 'material-ui/svg-icons/action/thumb-up';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import HomeIcon from 'material-ui/svg-icons/action/home';
import {List, ListItem} from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import helper from './util/helper';
import LoaderComponent from './LoaderComponent';
const appTokenKey = "appToken";

const contentStyle = {
    padding: '20px'
};
const styles = {
    refresh: {
        position: 'relative'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        height: "100%"
    },
    searchIcon: {
        position: 'relative',
        left: '-20'
    }

};
const textFieldStyle = {
    display: 'inline-block',
    width: '20%'
};
const customContentStyle = {
    width: '5%',
    maxWidth: 'none',
};

class Search_Contacts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened:false,
            props: this.props,
            data: [],
            people: [],
            loadingStatus: "loading",
            loadingDialogOpen: true,
            title: "Search Contacts",
            open: true,
            isRequestProcess: false,
        };
    }
    handleClose = () => {
        this.setState({open: false});
        this.props.history.push("/");
    };


    addContact(user) {
        console.log("135 ",user);
        this.setState({
            isRequestProcess:true
        });
        var currentUser = JSON.parse(localStorage.getItem("current-user"));
        var Obj = {
            UserID: currentUser._id,
            Email: currentUser.Email,
            Contacts: user,
        }
        console.log("obj 142 ",Obj);
        var promiseObj = helper.addContact(Obj);
        promiseObj.then(function(success){
            console.log("145 ",success);
            this.setState({
                isRequestProcess:false
            });
            this.getUserData();

        }.bind(this));
    }

    filterList(event){
        console.log("88 ",event.target.value);
        var updatedList = this.state.data;
        console.log("91 ",updatedList);
        updatedList = updatedList.filter(function (item) {
            return item.FullName.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            people:updatedList
        })
    }

    getUserData(){
        this.setState({
            loadingStatus: "loading",
        });
        var users=[];
        var session = localStorage.getItem(appTokenKey);
        var currentUser = JSON.parse(localStorage.getItem("current-user"));
        console.log("78 ",currentUser);
        var promiseObj = helper.getUsers();
        var obj ={
            Email: currentUser.Email
        }
        promiseObj.then(function(data){
            if(data){
                var that = this;
                var contactObj = helper.getContactList(obj);
                contactObj.then(function(success){
                    console.log(" ",success);
                    for(var i =0;i<data.length;i++){
                        var is = false;
                        for(var j=0;j<success.length;j++){
                            if(data[i].Email !== currentUser.Email){
                                if(data[i].Email === success[j].Email){
                                    data[i].Friend = true;
                                    users.push(data[i]);
                                    is = true;
                                }
                            }
                        }
                        if(!is && data[i].Email !== currentUser.Email){
                            users.push(data[i]);
                        }
                        //users.push(data[i]);

                    }
                    that.setState({
                        data: users,
                        people: users,
                        loadingStatus: "hide",
                        loadingDialogOpen: false,
                        currentUserName: currentUser.FullName,
                        currentUserEmail: currentUser.Email,
                    });
                }.bind(this));

            }
        }.bind(this));
    }

    componentDidMount() {
        this.getUserData();
        this.setState({
            people: this.state.data
        })
    }

    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        let userList =null;
        userList = this.state.people.map((user, i) => {
            if(!user.Friend){
                return <GridTile
                    key={i}
                    title={user.FullName}
                    subtitle={<span>by <b>{user.Email}</b></span>}
                    actionIcon={<IconButton disabled={this.state.isRequestProcess} onClick={Email => this.addContact(user)}><PersonAdd color="white"/></IconButton>}
                >
                    <img src={user.ImageURL}/>
                </GridTile>
            }else{
                return <GridTile
                    key={i}
                    title={user.FullName}
                    subtitle={<span>by <b>{user.Email}</b></span>}
                    actionIcon={<IconButton ><Added color="white"/></IconButton>}
                >
                    <img src={user.ImageURL}/>
                </GridTile>
            }

        });
        if(localStorage.getItem(appTokenKey)){
            return(
                <div>
                    <NavDrawer func={this.state.props} title={this.state.title}/>
                    <div style={contentStyle}>
                        <div>
                            <TextField
                                id="search"
                                type="text"
                                style={textFieldStyle}
                                onChange={this.filterList.bind(this)}
                                floatingLabelText="Search Name"
                                leftIcon={<SearchIcon color="black"/>}
                            />
                            <SearchIcon style={styles.searchIcon} color="#00bcd4"/>
                        </div>

                        {
                            this.state.loadingStatus === "loading"
                                ?
                                <LoaderComponent status={this.state.loadingStatus}/>
                                :
                                ""
                        }
                        {/*<Dialog*/}
                            {/*modal={false}*/}
                            {/*open={this.state.loadingDialogOpen}*/}
                            {/*contentStyle={customContentStyle}*/}
                        {/*>*/}
                            {/*<RefreshIndicator*/}
                                {/*size={50}*/}
                                {/*left={-10}*/}
                                {/*top={0}*/}
                                {/*loadingColor="#FF9800"*/}
                                {/*status={this.state.loadingStatus}*/}
                                {/*style={styles.refresh}*/}
                            {/*/>*/}
                        {/*</Dialog>*/}

                        <GridList
                            cellHeight={180}
                            cols={4}
                            style={styles.gridList}
                        >
                            <Subheader>Add People into Contact List</Subheader>
                            {userList}
                        </GridList>
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

export default Search_Contacts;