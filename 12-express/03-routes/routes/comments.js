const express = require('express');
const {
    postCommentsHandler, 
    getCommentsHandler, 
    deleteSingleCommentHandler, 
    getSingleCommentHandler
} = require('../controllers/comments')

const router = express.Router()

router.delete('/:commentId', deleteSingleCommentHandler);
router.get('/', getCommentsHandler);
router.post('/', postCommentsHandler);

// Создадим несколько методов для одного маршрута в более удобной форме (то что выше перепишем)
// router.route('/comments')
//     .get(getCommentsHandler)
//     .post(postCommentsHandler)
    // А если обратимся с неверным методом, сервер буде отвечать с 404 ошибкой

// Параметры маршрута
router.get('/:commentId', getSingleCommentHandler); // например /comments/100

module.exports = router;