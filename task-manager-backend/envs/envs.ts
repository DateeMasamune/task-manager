import { config } from 'dotenv';

config();

export const envs = {
  port: process.env.PORT_BACKEND || 3000,
  graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
};
