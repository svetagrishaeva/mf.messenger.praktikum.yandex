const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const router = express.Router();
const app = express();

//const static_dir = __dirname + '../static/';
//console.log(static_dir);
//console.log(path.join(static_dir, 'login.html'));

app.use('/', (_req, res) => res.sendFile(path.join(__dirname, '../static/login.html')));
app.use('/signin', (_req, res) => res.sendFile(path.join(__dirname, '../static/signin.html')));
app.use('/chats', (_req, res) => res.sendFile(path.join(__dirname, '../static/chats.html')));
app.use('/profile', (_req, res) => res.sendFile(path.join(__dirname, '../static/profile.html')));
app.use('/500-error', (_req, res) => res.sendFile(path.join(__dirname, '../static/500-error.html')));
app.use('/*', (_req, res) => res.sendFile(path.join(__dirname, '../static/404-error.html')));

// app.use(express.static(static_dir));
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (_req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);