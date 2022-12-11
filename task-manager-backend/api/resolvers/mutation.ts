import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { config } from '../../config';
import {
  MutationCreateBoardArgs, MutationCreateColumnArgs, MutationLoginArgs, MutationRegisterArgs, MutationUpdateBoardArgs,
} from '../../resolvers-types';
import { Models } from '../modeles/types';

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
  updateBoard: async (parent: any, { Board }: MutationUpdateBoardArgs, { models }: Models) => {
    try {
      await models.Board.replaceOne({ _id: Board.id }, Board);

      return await models.Board.findById(Board.id);
    } catch (error) {
      throw new Error('Error creating task');
    }
  },
  createColumn: async (parent: any, { name, boardId }: MutationCreateColumnArgs, { models }: Models) => {
    const column = new models.Column({
      _id: new mongoose.Types.ObjectId(),
      name,
      boardId,
    });

    try {
      await models.Board.updateOne({ _id: boardId }, {
        $push: {
          columns: {
            ...column,
          },
        },
      });

      return await models.Board.findById(boardId);
    } catch (error) {
      throw new Error('Error column task');
    }
  },
  createBoard: async (parent: any, { name, users, rootUser }: MutationCreateBoardArgs, { models }: Models) => {
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
};
