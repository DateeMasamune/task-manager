import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import {
  MutationAddUserForBoardArgs,
  MutationCreateBoardArgs, MutationLoginArgs, MutationRegisterArgs, MutationRemoveBoardArgs, MutationUpdateBoardArgs,
} from '../../resolvers-types';
import { authControl } from '../../utils/authControl';
import { Models } from '../modeles/types';
import { SubscriptionsConst } from '../subscriptions-const';

const {
  BOARD_UPDATE, BOARD_REMOVE, BOARD_CREATE, ADD_USER_FOR_BOARD,
} = SubscriptionsConst;

export const Mutation = {
  register: async (parent: any, {
    firstName, lastName, email, password,
  }:MutationRegisterArgs, { models }: Models) => {
    const candidate = await models.User.findOne({ email });

    if (candidate) {
      /* https://www.apollographql.com/docs/apollo-server/data/errors/ */
      const message = `Емейл ${candidate.email} уже занят, попробуйте другой`;
      throw new GraphQLError(message);
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new models.User({
      firstName,
      lastName,
      email,
      password: hashed,
    });

    try {
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Error creating account');
    }
  },
  login: async (parent: any, { email, password }: MutationLoginArgs, { models }: Models) => {
    const user = await models.User.findOne({ email });
    if (!user) {
      throw new GraphQLError('Такого юзера не существует');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new GraphQLError('Не правильный пароль');
    }

    return { token: jwt.sign({ id: user._id }, config.jwt), User: user };
  },
  updateBoard: async (parent: any, { Board }: MutationUpdateBoardArgs, { models, pubsub, user }: Models) => {
    authControl(user);
    try {
      await models.Board.replaceOne({ _id: Board.id }, Board);

      const board = await models.Board.findById(Board.id);

      await pubsub.publish(BOARD_UPDATE, {
        socketBoardUpdate: board,
      });

      return board;
    } catch (error) {
      throw new Error('Error creating task');
    }
  },
  createBoard: async (parent: any, { name, users, rootUser }: MutationCreateBoardArgs, { models, user, pubsub }: Models) => {
    authControl(user);
    const board = new models.Board({
      name,
      users,
      rootUser,
    });

    try {
      await board.save();

      await pubsub.publish(BOARD_CREATE, {
        socketBoardCreate: board,
      });

      return board;
    } catch (error) {
      throw new Error('Error board task');
    }
  },
  removeBoard: async (parent: any, { id }: MutationRemoveBoardArgs, { models, user, pubsub }: Models) => {
    authControl(user);

    try {
      await pubsub.publish(BOARD_REMOVE, {
        socketBoardRemove: id,
      });
      await models.Board.deleteOne({ _id: id });
      return id;
    } catch (error) {
      throw new Error('Error board task');
    }
  },
  addUserForBoard: async (parent: any, { id, users }: MutationAddUserForBoardArgs, { models, user, pubsub }: Models) => {
    authControl(user);

    try {
      await models.Board.updateOne({ _id: id }, {
        $addToSet: {
          users: {
            $each: users,
          },
        },
      });

      const board = await models.Board.findById(id);

      await pubsub.publish(ADD_USER_FOR_BOARD, {
        socketAddUserForBoard: board,
      });

      return board;
    } catch (error) {
      throw new Error('Error add users for board');
    }
  },
};
