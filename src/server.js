const express = require('express');
const serverless = require('serverless-http');
const router = express.Router();
const app = express();

const static_dir = __dirname + '../static';

router.get("/", (_req, res) => {
    res.json({
      hello: "hi!"
    });
  });

// router.get('/', (_req, res) => res.sendFile(static_dir + '/login.html'));
router.get('/signin', (_req, res) => res.sendFile(static_dir + '/signin.html'));
router.get('/chats', (_req, res) => res.sendFile(static_dir + '/chats.html'));
router.get('/profile', (_req, res) => res.sendFile(static_dir + '/profile.html'));
router.get('/500-error', (_req, res) => res.sendFile(static_dir + '/500-error.html'));
router.get('/*', (_req, res) => res.sendFile(static_dir + '/404-error.html'));

app.use(express.static(static_dir));
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);