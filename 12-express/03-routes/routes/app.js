const express = require('express');
const commentsRouter = require('./comments');
const usersRouter = require('./users');
const {getRootHandler} = require('../controllers/root');

const router = express.Router();

router.get('/', getRootHandler);

// Используем методы из староннего модуля в пути ./routes/comments
router.use('/comments', commentsRouter) // use -  можно использовать любой метод. Путь /comments не конкретный, это начало пути
router.use('/users', usersRouter) // если путь начинается на /users то запрос будет отправлен в usersRouter. 
                                  // и "/users" будет удалён, поэтому в usersRouter мы и указываем пути начиная с "/"

module.exports = router;