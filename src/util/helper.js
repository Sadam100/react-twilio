/**
 * Created by Sadam Hussain on 12/1/2017.
 */
var axios = require('axios');

var helpers = {
    getUsers: function(){
            return axios.post('https://messagingapp-server.herokuapp.com/api/getUsers').then(response =>{
            console.log("users ",response.data.users);
            var data = response.data.users;
            var i = 0;
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
    }

}

module.exports = helpers;