import express from 'express';
import morgan from 'morgan';
import qs from 'querystring'; // встроенный модуль для преобразовании строки запроса в объект JavaScript

const PORT = 5000;
const app = express();

// Используем внешний npm пакет с функцией Middleware, которая логгирует информацию о всех запросах клиента
app.use(morgan('combined')); // combined - значит подробную информацию 


// Самостоятельно создаём функцию Middleware

const logger = (req, re, next) => {
    console.log(req.method, req. path);
    next()
}

 app.use(logger); // отрабатывает функция logger и благодоря next() переходим к следующему этапу app.use (след функция Middleware )

// Отправляем JSON файл от клиента на сервер без Middleware
app.use((req, res, next) => { 
    let data = '';
    req.on('data', (chunk) => data += chunk)
    req.on('end', () => {
        const parsedJSON = JSON.parse(data);
        req.body = parsedJSON;
        next()
    })
})

// Отправляем JSON файл от клиента на сервер c Middleware
app.use(express.json())

app.use((req, res) => {
    console.log(req.body) // данные JSON хранятся в свойстве обекта req
    return res.send('This is express server')
})

// app.use(logger, (req, res) => res.send('This is express server'))  - краткая запись того что выше
// Функции контролеры - называют функции которые отправляют ответ клиента
// А функции Middleware называют функции которые изменяют res, req


// app.get('/', logger, (req, res) => res.send('This is express server')) - тут logger будет работать только для GET по пути "/"




// Парсинг формы без Middleware

app.use((req, res, next) => {
    if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
        let data = '';
        req.on('data', (chunk) => data += chunk);
        req.on('end', () => {
            const parsedFormData = qs.parse(data);
            console.log(parsedFormData) // Получим данные из формы в виде объекта JavaScript
            req.body(parsedFormData)
            next();
        })
    } else {
        next(); // Если вдргу другой заголовок, то переходим к другой функции
    }
})

// Парсинг формы с Middleware

app.use(express.urlencoded({extended: false})) // extended: false - используем встроенный qs, true - используем внушний qs




app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})