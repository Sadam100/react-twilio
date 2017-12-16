/**
 * Created by Sadam Hussain on 12/1/2017.
 */
var axios = require('axios');
var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/sadam/upload';
var CLOUDINARY_UPLOAD_PRESET = 'woa1ui5l';
var helpers = {
    getUsers: function(){
            return axios.post('https://messagingapp-server.herokuapp.com/api/getUsers').then(response =>{
            console.log("users ",response);
            var data = response.data.users;
            var i = 0;
            return data;
        });
    },

    getContactList: function(obj){
        return axios.post('https://messagingapp-server.herokuapp.com/api/getContactList', obj).then(response =>{
            console.log("contact list ",response);
            var data = {}
            if(response.data && response.data.Contacts){
                data = response.data.Contacts;
            }else{
                data = "No Contact List!";
            }
            return data;
        });
    },

    addUser: function (obj) {
        console.log("helper ", obj);
        return axios.post('https://messagingapp-server.herokuapp.com/api/signup', obj).then(response => {
                console.log(response, 'User added!');
                return response;
        }).catch(err => {
                console.log(err, 'User not added, try again');
                return err;
        });
    },
    signIn: function (obj) {
        return axios.post('https://messagingapp-server.herokuapp.com/api/signin', obj).then(response => {
            console.log(response, 'User added!')
            return response;
        }).catch(err => {
            console.log(err, 'User not added, try again');
            return err;
        });
    },
    sendMessage: function (obj) {
        return axios.post('https://messagingapp-server.herokuapp.com/api/sendMessage', obj).then(response => {
            console.log(response, 'Message Sent!')
            return response;
        }).catch(err => {
            console.log(err, 'Message not Sent, try again');
            return err;
        });
    },

    addContact: function (obj) {
        return axios.post('https://messagingapp-server.herokuapp.com/api/addContact', obj).then(response => {
            console.log(response, 'Add Contact!')
            return response;
        }).catch(err => {
            console.log(err, 'Contact not Added, try again');
            return err;
        });
    },

    uploadImage: function (obj) {
        return axios.post('https://api.cloudinary.com/v1_1/sadam/upload', obj,{
            headers: { "X-Requested-With": "XMLHttpRequest" },}).then(response => {
            console.log(response, 'Uploaded on cloudinary!')
            return response;
        }).catch(err => {
            console.log(err, 'Not Uploaded, try again');
            return err;
        });
    }

}

module.exports = helpers;