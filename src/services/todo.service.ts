import mongoose from 'mongoose';
import { ITodo, UpdateTodoInput } from '../types/todo.types';
import Todo from '../models/todo.model'

const createTodo = async (todoData: ITodo) : Promise<ITodo> => {
  try {
    const todo = new Todo(todoData);
    return await todo.save();
  } catch (err) {
    console.error('Error in todo.service.createTodo:', err);
    throw err;
  }
};

const getTodosByUser = async (userId: string): Promise<ITodo[]> => {
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		throw new Error('Invalid user ID');
	}

	return await Todo.find({ user: userId });
};
  

const deleteTodoById = async (todoId: string, userId: string): Promise<ITodo | null> => {
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new Error('Invalid todo ID');
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, user: userId });
  return deletedTodo;
};

const updateTodoById = async (
  todoId: string,
  userId: string,
  updateData: UpdateTodoInput
): Promise<ITodo | null> => {

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new Error('Invalid todo ID');
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  // Set dueDate time to midnight UTC if provided
  if (updateData.dueDate) {
    const dateOnly = new Date(updateData.dueDate);
    dateOnly.setUTCHours(0, 0, 0, 0);
    updateData.dueDate = dateOnly;
  }

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId, user: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  ).lean();

  return updatedTodo;
};

const markExpiredTodosAsCompleted = async (): Promise<number> => {
  const now = new Date();

  const result = await Todo.updateMany(
    { dueDate: { $lt: now }, completed: false },
    { $set: { completed: true, updatedByCron: true } }
  );

  return result.modifiedCount; 
};

export const todoServices = {
  createTodo,
  getTodosByUser,
	deleteTodoById,
	updateTodoById,
	markExpiredTodosAsCompleted
};
