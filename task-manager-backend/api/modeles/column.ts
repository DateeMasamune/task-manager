import { model, Schema } from 'mongoose';
import { TaskSchema } from './task';

const ColumnSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  boardId: {
    type: String,
    require: true,
  },
  tasks: {
    type: [TaskSchema],
    require: true,
  },
});

export const Column = model('Columns', ColumnSchema);
