const express = require('express');
const path = require('path');
const app = express();


app.use(express.static('dist'));
const static_dir = path.join(__dirname, '../static/');

app.use(express.static(static_dir));
app.get('/',  (_req,  _res) => _res.sendFile('index.html', { root: './src'}  ));
app.get('/signin', (_req, res) => res.sendFile(static_dir + 'signin.html'));
app.get('/chats', (_req, res) => res.sendFile(static_dir + 'chats.html'));
app.get('/profile', (_req, res) => res.sendFile(static_dir + 'profile.html'));
app.get('/*', (_req, res) => res.sendFile(static_dir + 'error.html'));

app.listen(3000);
