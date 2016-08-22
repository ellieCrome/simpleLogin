'use strict';
var User = require('../models/user'); // get the mongoose model
var signupService = {};

signupService.signupHandler = function(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (!username || !password) {
        var error = { message: "Please pass name and password." };
        res.json(error);
    } else {
        signupService.createUser(username, password).then(function(success) {
            res.send(success);
        }, function(error) {
            res.json(error);
        });
    }
};

signupService.createUser = function(username, password) {

    return new Promise(function(resolve, reject) {
        var userDetails = {
            username: username,
            password: password
        }

        var newUser = new User(userDetails);

        // save the user
        newUser.save(function(err) {
            if (err) {
                reject({ message: "Username already exists." });
            } else {
                resolve({
                    message: "Successfully created new user.",
                    user: userDetails
                });
            }
        });
    });
};


module.exports = signupService;
