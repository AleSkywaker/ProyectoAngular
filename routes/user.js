'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'})

api.get('/probando', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);

module.exports = api;