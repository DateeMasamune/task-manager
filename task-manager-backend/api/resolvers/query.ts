// import { authControl } from '../../utils/authControl';

import { QueryGetBoardArgs } from '../../resolvers-types';
import { authControl } from '../../utils/authControl';
import { Models } from '../modeles/types';

export const Query = {
  getUsers: async (parent: any, args: any, { models, user }: Models) => {
    try {
      return await models.User.find();
    } catch (error) {
      throw new Error('Error get users');
    }
  },
  getBoard: async (parent: any, { id }: QueryGetBoardArgs, { models, user }: Models) => {
    try {
      return await models.Board.findById(id);
    } catch (error) {
      throw new Error('Error get Board');
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
