import { model, Schema } from 'mongoose';
import { Column } from './column';

const BoardSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  users: {
    type: [String],
    require: true,
  },
  rootUser: {
    type: String,
    require: true,
  },
  columns: {
    type: [Column.schema],
    require: true,
  },
});

export const Board = model('Boards', BoardSchema);
