const express = require('express');
const path = require('path');
const app = express();

const static_dir = path.join(__dirname, './dist');
app.use(express.static(static_dir));

app.get('/',  (_req,  _res) => _res.sendFile('index.html', { root: static_dir}  ));
app.get('/signin',  (_req,  _res) => _res.sendFile('index.html', { root: static_dir}  ));
app.get('/chats',  (_req,  _res) => _res.sendFile('index.html', { root: static_dir}  ));
app.get('/profile',  (_req,  _res) => _res.sendFile('index.html', { root: static_dir}  ));
app.get('/*',  (_req,  _res) => _res.sendFile('index.html', { root: static_dir}  ));

app.listen(3000);
