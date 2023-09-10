const express = require('express');
const router = require('./routes/app');

const app = express();

app.use(router);

app.listen(5000, () => console.log('Server listen in port 5000'));