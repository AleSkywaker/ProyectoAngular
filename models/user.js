'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password:String,
    role:String,
    image:String
});
module.exports = monoose.model('User', UserSchema);