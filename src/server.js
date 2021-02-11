const express = require('express');
const path = require('path');
const app = express();

const static_dir = path.join(__dirname, '../static/');

app.use(express.static(static_dir));

app.get('/', (_req, res) => res.sendFile(static_dir + 'login.html'));
app.get('/signin', (_req, res) => res.sendFile(static_dir + 'signin.html'));
app.get('/chats', (_req, res) => res.sendFile(static_dir + 'chats.html'));
app.get('/profile', (_req, res) => res.sendFile(static_dir + 'profile.html'));
app.get('/500-error', (_req, res) => res.sendFile(static_dir + '500-error.html'));
app.get('/*', (_req, res) => res.sendFile(static_dir + '404-error.html'));
