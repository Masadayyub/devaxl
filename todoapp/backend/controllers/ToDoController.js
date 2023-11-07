const Todo = require('../models/Todo');

// Get all todos for a user
const getUserTodos = async (req, res) => {
  const userId = req.user.id; // Get the user ID from request
  
  try {
    const todos = await Todo.find({ userId });
    console.log("User's fetched todos: ", todos, "against user ID: ", userId);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user todos' });
  }
};

// Create a new todo for a user
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id; // Get the user ID from request

  try {
    const todo = new Todo({ title, description, userId });
    await todo.save();
    console.log(todo, "has been created successfully for the user with ID: ", userId);

    res.status(201).json({ message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

// Update an existing todo
const updateTodo = async (req, res) => {
  const { title, description } = req.body;
  const todoId = req.params.id; // Get the todo ID from request parameters

  try {
    await Todo.findByIdAndUpdate(todoId, { title, description });
    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const todoId = req.params.id; // Get the todo ID from request parameters

  try {
    await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};

module.exports = { getUserTodos, createTodo, updateTodo, deleteTodo };
