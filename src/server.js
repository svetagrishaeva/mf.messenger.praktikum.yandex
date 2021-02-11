const express = require('express');
const path = require('path');
const app = express();

const static_dir = path.join(__dirname, '../static/');

app.use(express.static(static_dir));

const router = express.Router();
router.get('/login', (_req, res) => res.sendFile(static_dir + 'login.html'));
router.get('/signin', (_req, res) => res.sendFile(static_dir + 'signin.html'));
router.get('/chats', (_req, res) => res.sendFile(static_dir + 'chats.html'));
router.get('/profile', (_req, res) => res.sendFile(static_dir + 'profile.html'));
router.get('/500-error', (_req, res) => res.sendFile(static_dir + '500-error.html'));
router.get('/*', (_req, res) => res.sendFile(static_dir + '404-error.html'));

app.use('/', router);  
app.use("/", (_req, res) => res.redirect("/login"));
