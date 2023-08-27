const comments = require ('./data')

function getHtml (req, res) {
    req.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write('<html><body><div>')
    res.write('<h2>New HTML code with "res.write"</h2>')
    res.write('</html></body></div>')
    res.end()  // Обязательно нужно! Чтоб отправить ответ клиенту
}

function getHttp (req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain') // укажем заголовок, что в ответе передаём текст, а не например страницу html
    res.end('Greeting from the Http') // Чтоб callback завершило свою работу отправляем ответ клиенту 
}

function getComments (req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json') // заголовок json
    res.end(JSON.stringify(comments))
}

function handleNotFound (req,res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Page not found!</h1>')
}

function postComments(req, res) {
    res.setHeader('Content-Type', 'text/plain')

    if(req.headers['content-type'] !== 'application/json') { // Проверяем, что клиент отправил нам json файл
        res.statusCode = 400
        res.end('Data must be in JSON format')
    } else {
        let commentJSON = '';
    
        req.on('data', (chunk) => commentJSON += chunk)
    
        req.on('end', () => {
            try{ // Вдруг json файл не валидный и нелзя его конвертировать в JSON формат, тогда будет выброшен участок кода catch
                comments.push(JSON.parse(commentJSON))
                res.statusCode = 200
                res.end('Comment data was received')
            } catch (error) {
                res.statusCode = 400
                res.end('Invalid JSON')
            }
        })
    }


}

module.exports = {
    getHtml,
    getHttp,
    getComments,
    handleNotFound,
    postComments
}