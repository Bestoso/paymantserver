require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
// we will use react for the static files
app.use(express.static(path.resolve(__dirname, '../../client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.use('/api', require('../router/app.router'));
app.get('/proof', (req, res) => {
    res.send('Hola mundo');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});