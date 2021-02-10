const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const router = express.Router();
const app = express();

router.get('/', (_req, res) => res.sendFile(path.join(__dirname, '../static/login.html')));
router.get('/signin', (_req, res) => res.sendFile(path.join(__dirname, '/static/signin.html')));
router.get('/chats', (_req, res) => res.sendFile(path.join(__dirname, 'chats.html')));
router.get('/profile', (_req, res) => res.sendFile(path.join('profile.html')));
router.get('/500-error', (_req, res) => res.sendFile(path.join(__dirname, '../static/500-error.html')));
router.get('/*', (_req, res) => res.sendFile(path.join(__dirname, '../static/404-error.html')));

// app.use(express.static(static_dir));
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (_req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);