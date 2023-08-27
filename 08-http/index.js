const http = require('http')
const {getComments, getHtml, getHttp, handleNotFound, postComments, getHome} = require('./handlers')

const PORT = 5000;

const server = http.createServer((req, res) => { // callback функция юудет вызвана при каждом запросе клиента
    if (req.method === 'GET' && req.url === '/') {
        return getHome(req, res)
    }

    if (req.method === 'GET' && req.url === '/http') {
        return getHttp(req, res)
    }

    if (req.method === 'GET' && req.url === '/html') {
       return getHtml(req, res)
    }

    if (req.method === 'GET' && req.url === '/comments') {
        return getComments(req, res)
    }

    if (req.method === 'POST' && req.url === '/comments') {
        return postComments(req, res)
    }

    handleNotFound(req, res)
})

server.listen(PORT, () => { // запускаем сервер на порту 5000, и передаём callback ąункцию которая выполнится при запуска сервера
    console.log(`Server was launched on port ${PORT}`)
}) // Запустили Event loop и сервер ожидает новые подключения