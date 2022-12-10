import jwt from 'jsonwebtoken';
import { config } from '../config';

export const getUser = (token: string | undefined) => {
  if (token) {
    try {
      return jwt.verify(token, config.jwt);
    } catch (err) {
      Error('Session invalid');
    }
  }
};
