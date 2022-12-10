import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { MutationLoginArgs, MutationRegisterArgs } from '../../resolvers-types';
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
};
