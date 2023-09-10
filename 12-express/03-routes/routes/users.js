const express = require('express');
const router = express.Router();

const {getUsersHandler, postUsersHandler, getSingleUserHandler} = require('../controllers/users')

router.get('/', getUsersHandler);
router.post('/', postUsersHandler);
router.get('/:userId', getSingleUserHandler);

module.exports = router