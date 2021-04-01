const express = require('express');
const path = require('path');
const app = express();

const { PORT = 80 } = process.env;
app.use(express.static(path.join(__dirname, './dist')));

app.get('*',  (_req,  _res) => _res.sendFile('index.html', { root: path.join(__dirname, './dist')}  ));
app.listen(PORT, () => {
    console.log(`App start on http://localhost:${PORT}`);
});

