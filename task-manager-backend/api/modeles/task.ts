import { model, Schema } from 'mongoose';

export const TaskSchema = new Schema({
  content: {
    type: String,
    require: true,
  },
  columnId: {
    type: String,
    require: true,
  },
});

export const Task = model('Tasks', TaskSchema);
