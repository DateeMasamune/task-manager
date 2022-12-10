import { config } from 'dotenv';

config();

export const envs = {
  port: process.env.PORT || 3000,
  graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
};
