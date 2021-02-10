const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const router = express.Router();
const app = express();

const static_dir = path.join(__dirname, '../static');
console.log(static_dir);
console.log(path.join(static_dir, 'login.html'));

router.get('/', (_req, res) => res.sendFile(path.join(static_dir, 'login.html')));
router.get('/signin', (_req, res) => res.sendFile(path.join(static_dir, 'signin.html')));
router.get('/chats', (_req, res) => res.sendFile(path.join(static_dir, 'chats.html')));
router.get('/profile', (_req, res) => res.sendFile(path.join(static_dir, 'profile.html')));
router.get('/500-error', (_req, res) => res.sendFile(path.join(static_dir, '500-error.html')));
router.get('/*', (_req, res) => res.sendFile(path.join(static_dir, '404-error.html')));

app.use(express.static(static_dir));
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (_req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);