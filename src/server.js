const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('dist'));
app.get('/error',  (_req,  _res) => _res.sendFile('error.html', { root: path.resolve(__dirname, '../dist') } )) ;

app.listen(3000);
