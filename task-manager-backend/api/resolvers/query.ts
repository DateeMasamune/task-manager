// import { authControl } from '../../utils/authControl';

import { QueryGetBoardArgs } from '../../resolvers-types';
import { Models } from '../modeles/types';

export const Query = {
  getUsers: async () => {},
  getBoard: async (parent: any, { id }: QueryGetBoardArgs, { models, user }: Models) => {
    try {
      return await models.Board.findById(id);
    } catch (error) {
      throw new Error('Error get Board');
    }
  },
  // getUsers: async (parent: any, args: any, { models, user }: Models) => {
  //   authControl(user);

  //   try {
  //     return await models.User.find();
  //   } catch (error) {
  //     throw new Error('Error get users');
  //   }
  // },
};
