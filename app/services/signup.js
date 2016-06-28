'use strict';
var User = require('../models/user'); // get the mongoose model

var signupService = {};

signupService.signupHandler = function(req, res) {
    var name = req.query.name;
    var password = req.query.password;

    if (!name || !password) {
        var error = { message: "Please pass name and password." };
        res.json(error);
    } else {
        signupService.createUser(name, password).then(function(success) {
            res.send(success);
        }, function(error) {
            res.json(error);
        });

    }

};

signupService.createUser = function(name, password) {

    return new Promise(function(resolve, reject) {
        var userDetails = {
            name: name,
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
