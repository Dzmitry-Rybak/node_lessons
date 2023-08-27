const fs = require('fs')
const qs = require('querystring'); // встроенный модель, например для преобразования строки запроса в объект JavaScript.
const comments = require ('./data')

function getHome (req, res) {
    fs.readFile('./files/comment-form.html', (err, data) => {
        if (err) {
            console.error(err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/plain')
            res.end('Server error while loading HTML')
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        }
    })

}

function getHtml (req, res) {
    res.statusCode = 200
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

    if (req.headers['content-type'] == 'application/x-www-form-urlencoded') { // Условие если получаем формат Формы
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString()}) // делаем toSting, потому что часто данные, полученные из потока, передаются в виде буфера (низкоур. структура)
        req.on('end', () => {
            try {
                const comment = qs.parse(body)
                comment.id = parseInt(comment.id)
                comments.push(comment)
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                res.write('<h1>Comment data was received</h1>')
                res.write('<a href="/">Submit one more comment</a>')
                res.end()
            } catch (error) {
                res.statusCode = 400
                res.end('Invalid Form data')
            }
        })

    } else if (req.headers['content-type'] === 'application/json') { // Условие если получаем JSON формат
        let commentJSON = '';
    
        req.on('data', (chunk) => commentJSON += chunk)
    
        req.on('end', () => {
            try { // Вдруг json файл не валидный и нелзя его конвертировать в JSON формат, тогда будет выброшен участок кода catch
                comments.push(JSON.parse(commentJSON))
                res.statusCode = 200
                res.end('Comment data was received')
            } catch (error) {
                res.statusCode = 400
                res.end('Invalid JSON')
            }
        })
    } else {
        res.statusCode = 400
        res.end('Data must be in JSON format or as form')
    }


}

module.exports = {
    getHtml,
    getHttp,
    getComments,
    handleNotFound,
    postComments,
    getHome
}