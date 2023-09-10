// Вариант со встроенным http
// const http = require('http')

// const server = http.createServer((req, res) => {
//     res.end('Response from the server')
// })

// server.listen(5000, () => console.log('Server listen in port 5000'))


// Вариант при помощи express
const express = require('express')

const app = express()

app.get('/', (req, res) => { // по пути '/' при get запросе 
    res.send('Response from express')
})

app.listen(5000, () => console.log('Server listen in port 5000'))