import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { config } from '../../config';
import {
  MutationCreateBoardArgs, MutationCreateColumnArgs, MutationLoginArgs, MutationRegisterArgs, MutationRemoveBoardArgs, MutationUpdateBoardArgs,
} from '../../resolvers-types';
import { authControl } from '../../utils/authControl';
import { Models } from '../modeles/types';
import { SubscriptionsConst } from '../subscriptions-const';

const { BOARD_UPDATE } = SubscriptionsConst;

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
  createColumn: async (parent: any, { name, boardId, tasks }: MutationCreateColumnArgs, { models, pubsub }: Models) => {
    const column = new models.Column({
      _id: new mongoose.Types.ObjectId(),
      name,
      boardId,
      tasks,
    });

    try {
      await models.Board.updateOne({ _id: boardId }, {
        $push: {
          columns: {
            ...column,
          },
        },
      });

      const board = await models.Board.findById(boardId);

      await pubsub.publish(BOARD_UPDATE, {
        socketBoardUpdate: board,
      });

      return board;
    } catch (error) {
      throw new Error('Error column task');
    }
  },
  createBoard: async (parent: any, { name, users, rootUser }: MutationCreateBoardArgs, { models, user }: Models) => {
    authControl(user);
    const board = new models.Board({
      name,
      users,
      rootUser,
    });

    try {
      await board.save();
      return board;
    } catch (error) {
      throw new Error('Error board task');
    }
  },
  removeBoard: async (parent: any, { id }: MutationRemoveBoardArgs, { models, user }: Models) => {
    authControl(user);
    try {
      await models.Board.remove({ _id: id });
      return id;
    } catch (error) {
      throw new Error('Error board task');
    }
  },
};
