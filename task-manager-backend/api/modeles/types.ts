import { Model } from 'mongoose';
import { User } from '../../resolvers-types';

export interface Models {
  user: User
  pubsub: any
  models: {
    User: Model<User>
  }
}
