'use strict';
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const router = express.Router();
const app = express();

//const static_dir = __dirname + '../static/';
console.log(__dirname);
//console.log(path.join(static_dir, 'login.html'));

const static_dir = { root: path.join(__dirname, '/static') };

router.get('/', (_req, res) => res.sendFile(path.resolve('static/login.html')));
router.get('/signin', (_req, res) => res.sendFile(path.resolve('static/signin.html')));
router.get('/chats', (_req, res) => res.sendFile(path.resolve('static/chats.html')));
router.get('/profile', (_req, res) => res.sendFile(path.resolve('static/profile.html')));
router.get('/500-error', (_req, res) => res.sendFile(path.resolve('static/500-error.html')));
router.get('/*', (_req, res) => res.sendFile(path.resolve('static/404-error.html')));

// app.use(express.static('static'));
app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (_req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);