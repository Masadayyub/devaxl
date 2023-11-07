const express = require('express');
const todoController = require('../controllers/ToDoController');
const authenticateToken = require('../middleware/jwtMiddleware');

const router = express.Router();

//routes for to todo CRUD
router.get('/', authenticateToken, todoController.getUserTodos);
router.post('/', authenticateToken, todoController.createTodo);
router.put('/:id', authenticateToken, todoController.updateTodo);
router.delete('/:id', authenticateToken, todoController.deleteTodo);

module.exports = router;
