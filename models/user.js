/**
 * Created by stevenmcdonald on 2/25/17.
 */
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

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.saveUser = function(createUser, callback){
    bcrypt.genSalt(10, function(error, salt) {
        bcrypt.hash(createUser.password, salt, function(error, hash) {
            if(error) throw error;
            createUser.password = hash;
            createUser.save(callback);
        });
    });
};