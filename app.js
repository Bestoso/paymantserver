require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api', require('./router/app.router'));
app.get('/', (req, res) => {
    res.send('Hola mundo');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});