/**
 * Created by stevenmcdonald on 2/25/17.
 */
"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    firstname: {  type: String,  required: true },
     lastname: {  type: String,  required: true },
     email: {  type: String,  required: true },
     username: {  type: String,  equired: true },
     password: {  type: String,  required: true }, 
    phonenumber:{  type: String,  required: true }, 
    occupation: {  type: String  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Retreive all users.
module.exports.getUsers = function (callback, limit) {
    User.find(callback).limit(limit);
};

// Retreive a user by id.
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

// User by username
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
};

// Save a single user to the users database.
module.exports.saveUser = function(createUser, callback){
    bcrypt.genSalt(10, function(error, salt) {
        bcrypt.hash(createUser.password, salt, function(error, hash) {
            if(error) throw error;
            createUser.password = hash;
            createUser.save(callback);
        });
    });
};

// Update a user
module.exports.updateUser = function (id, user, options, callback) {
    const query = {_id: id};

    const update = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        password: user.password,
        phonenumber: user.phonenumber,
        occupation: user.occupation
    };
    User.findOneAndUpdate(query, update, options, callback);
};

// Deleting a user
module.exports.deleteUser = function (id, callback) {
    const query = {_id: id};
    User.remove(query, callback);
};

// Check to see if user password matches.
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(error, isMatch) {
        if(error) {
            throw error;
        }
        callback(null, isMatch);
    });
};