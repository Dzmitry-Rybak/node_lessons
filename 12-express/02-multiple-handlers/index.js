const express = require('express');

const app = express();

const firstHandler = (req, res, next) =>  { 
    console.log('First handler');
    next() // Чтоб перейти к следующей функции, нужно вызвать next()
} 
const secondHandler = (req, res) => res.send('Response from express');

app.get('/', firstHandler, secondHandler);

app.listen(5000, () => console.log('Server listen in port 5000'));