/**
 * Created by stevenmcdonald on 2/25/17.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get("/", function(request, response, next) {
    User.getUsers(function(error, users) {
        if(error) {
            throw error;
        }
        response.json(users);
    });
});

// Return one user by id.
router.get("/:_id", function (request, response) {
    User.getUserById(request.params._id, function (error, user) {
        if(error) {
            throw error;
        }

        response.json(user);
    });
});

// Register
router.post('/register', (request, response) => {
    let creatUser = new User({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password,
        phonenumber: request.body.phonenumber,
        occupation: request.body.occupation
    });

    User.saveUser(creatUser, function(error, user) {
        if(error){
            response.json({success: false, message:'Registration was unsuccessful'});
        } else {
            response.json({success: true, message:'Registration was successful'});
        }
    });
});

router.put("/update/:_id", function(request, response) {
        const id = request.params._id;
        const user = request.body
        User.updateUser(id, user, {}, function(error, user) {
            if(error) {
                throw error;
            }
        response.json(user);
    });
});

router.delete("/delete/:_id", function(request, response) {
        const id = request.params._id;
        User.deleteUser(id, function(error, user) {
            if(error) {
                throw error;
            }
        response.json(user);
    });
});

// Authenticate
router.post("/authenticate", function(request, response, next) {
    response.send('AUTHENTICATE');
});

// User Information
router.get('/userinfo', function (request, response, next) {
    response.send('User Info');
});

module.exports = router;
