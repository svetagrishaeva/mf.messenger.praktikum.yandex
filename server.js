const express = require('express');
const path = require('path');
const app = express();

const { PORT = 80 } = process.env;
const static_dir = path.join(__dirname, './dist');
app.use(express.static(static_dir));

app.get('/*',  (_req,  _res) => _res.sendFile('index.html', { root: static_dir}  ));
app.listen(PORT, () => {
    console.log(`App start on http://localhost:${PORT}`);
});

