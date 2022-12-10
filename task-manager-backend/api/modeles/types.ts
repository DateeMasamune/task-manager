import { Model } from 'mongoose';
import {
  Board, Column, Task, User,
} from '../../resolvers-types';

export interface Models {
  user: User
  pubsub: any
  models: {
    User: Model<User>
    Board: Model<Board>
    Column: Model<Column>
    Task: Model<Task>
  }
}
