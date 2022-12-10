import { AuthenticationError } from 'apollo-server-express';
import { User } from '../resolvers-types';

export const authControl = (user: User) => {
  if (!user) {
    throw new AuthenticationError('Вы не авторизованы');
  }
};
