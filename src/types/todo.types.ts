import { Types } from 'mongoose';

export interface ITodo {
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  updatedByCron?: boolean
  user: Types.ObjectId | string;
}

export interface ITodoModel extends ITodo {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  dueDate?: Date;
  completed?: boolean;
  updatedByCron?: boolean
}
