/**
 * Created by stevenmcdonald on 2/25/17.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require("../config/database");
const User = require('../models/user');

// Retreive all users.
router.get("/",  function(request, response) {
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

router.delete("/delete/:_id", passport.authenticate('jwt', {session: false}), function(request, response) {
        const id = request.params._id;
        User.deleteUser(id, function(error, user) {
            if(error) {
                throw error;
            }
        response.json(user);
    });
});

// Authenticate
router.post('/authenticate', function(request, response, next) {
  const username = request.body.username;
  const password = request.body.password;

  User.getUserByUsername(username, function(error, user) {
    if(error) {
        throw error;
    }

    if(!user){
      return response.json({success: false, message: 'User not found'});
    }

    User.comparePassword(password, user.password, function(error, isMatch) {
      if(error) {
        throw error;
      }

      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800
        });

        response.json({
          success: true,
          token: 'JWT' + token,
          user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return response.json({success: false, message: 'Wrong password'});
      }
    });
  });
});

module.exports = router;
