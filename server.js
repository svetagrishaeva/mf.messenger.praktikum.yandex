const express = require('express');

const app = express();
const PORT = 4000;
const static_dir = __dirname + '/static';

app.use(express.static(static_dir));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 

app.get('/', (_req, res) => res.sendFile(static_dir + '/login.html'));

app.get('/signin', (_req, res) => res.sendFile(static_dir + '/signin.html'))

app.get('/chats', (_req, res) => res.sendFile(static_dir + '/chats.html'))

app.get('/profile', (_req, res) => res.sendFile(static_dir + '/profile.html'))

app.get('/500-error', (_req, res) => res.sendFile(static_dir + '/500-error.html'))

app.get('/*', (_req, res) => res.sendFile(static_dir + '/404-error.html'))
