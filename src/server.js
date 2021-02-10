'use strict';
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const router = express.Router();
const app = express();

//const static_dir = __dirname + '../static/';
console.log(__dirname);
//console.log(path.join(static_dir, 'login.html'));

const static_dir = { root: path.join(__dirname, '../static') };

router.get('/', (_req, res) => res.sendFile('login.html', static_dir));
router.get('/signin', (_req, res) => res.sendFile('signin.html', static_dir));
router.get('/chats', (_req, res) => res.sendFile('chats.html', static_dir));
router.get('/profile', (_req, res) => res.sendFile('profile.html', static_dir));
router.get('/500-error', (_req, res) => res.sendFile('500-error.html', static_dir));
router.get('/*', (_req, res) => res.sendFile('404-error.html', static_dir));

//app.use(express.static(__dirname + '../static/'));
app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (_req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);