import {  Response } from 'express';
import { todoServices } from '../services';
import { sendResponse } from '../utils/responseHandler.js';
import { createTodoSchema, updateTodoSchema } from '../validations/todo.validation';
import { AuthRequest } from '../types/express';

// Create a new todo
	const createTodo = async (req: AuthRequest, res: Response): Promise<Response> => {
		try {
				
			const { error, value } = createTodoSchema.validate({
					...req.body,
					user: req.userId
				});

			if (error) {
				return sendResponse(res, {
					success: false,
					statusCode: 400,
					message: error.details?.[0]?.message,
				});
			}
			
			const todo = await todoServices.createTodo(value);

			if (!todo) {
				return sendResponse(res, {
					success: false,
					statusCode: 500,
					message: 'Failed to create todo',
				});
			}

			return sendResponse(res, {
				success: true,
				statusCode: 201,
				data: todo,
				message: 'Todo created successfully',
			});

		} catch (err: unknown) {
			console.error('Error while creating todo:', err);
			let message = 'Internal server error';
			if (err instanceof Error) message = err.message;
			return sendResponse(res, {
				success: false,
				statusCode: 500,
				message,
			});
		}
	};

const getTodos = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.userId;

		if (!userId) {
      return sendResponse(res, {
        success: false,
        statusCode: 401,
        message: 'User not authenticated',
      });
    }
    const todos = await todoServices.getTodosByUser(userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      data: todos,
      message: 'Todos retrieved successfully',
    });
  } catch (err: unknown) {
    console.error('Error while fetching todos:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message,
    });
  }
};

const updateTodo = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const todoId = req.params.id;
    const userId = req.userId;

    if (!todoId) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: 'Todo ID is required',
      });
    }
		
		if (!userId) {
      return sendResponse(res, {
        success: false,
        statusCode: 401,
        message: 'User not authenticated',
      });
    }

    // Validate update data using Joi schema
    const { error, value } = updateTodoSchema.validate(req.body);
		
    if (error) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: error.details?.[0]?.message,
      });
    }

    const updatedTodo = await todoServices.updateTodoById(todoId, userId, value);

    if (!updatedTodo) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: 'Todo not found',
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      data: updatedTodo,
      message: 'Todo updated successfully',
    });

  } catch (err: unknown) {
    console.error('Error while updating todo:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';

    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message,
    });
  }
};

const deleteTodo = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const todoId = req.params.id;
    const userId = req.userId;

    if (!todoId) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: 'Todo ID is required',
      });
    }
		if (!userId) {
      return sendResponse(res, {
        success: false,
        statusCode: 401,
        message: 'User not authenticated',
      });
    }
    const deletedTodo = await todoServices.deleteTodoById(todoId, userId);

    if (!deletedTodo) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: 'Todo not found',
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      data: deletedTodo,
      message: 'Todo deleted successfully',
    });
  } catch (err: unknown) {
    console.error('Error while deleting todo:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message,
    });
  }
};


export const todoController = {
    createTodo,
		getTodos,
		deleteTodo,
		updateTodo
  };