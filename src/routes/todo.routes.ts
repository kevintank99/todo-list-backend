import { Router } from 'express';
import { todoController } from '../contollers';

const todoRouter = Router({ mergeParams: true });

// Create a new todo for user
todoRouter.post('/', todoController.createTodo);

// Get all todos for the logged-in user
todoRouter.get('/', todoController.getTodos);

// // Update a todo by ID 
todoRouter.put('/:id', todoController.updateTodo);

// // Delete a todo by ID 
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;
