import { authControl } from '../../utils/authControl';
import { Models } from '../modeles/types';

export const Query = {
  getUsers: async (parent: any, args: any, { models, user }: Models) => {
    authControl(user);

    try {
      return await models.User.find();
    } catch (error) {
      throw new Error('Error get users');
    }
  },
  getAllBoard: async (parent: any, args: any, { models, user }: Models) => {
    authControl(user);

    try {
      return await models.Board.find();
    } catch (error) {
      throw new Error('Error get Boards');
    }
  },
};
