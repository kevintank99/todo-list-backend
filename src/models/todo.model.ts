import mongoose, { Schema, Document } from 'mongoose';
import { ITodoModel } from '../types/todo.types';

type TodoDocument = ITodoModel & Document;

const TodoSchema = new Schema<TodoDocument>({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function (value: Date) {
        return value > new Date(); // must be in future
      },
      message: 'Due date must be in the future.',
    },
   },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
  {
    timestamps: true,
    versionKey: false,
    collection: "todos",
  }
);

export default mongoose.model<TodoDocument>('Todo', TodoSchema);
