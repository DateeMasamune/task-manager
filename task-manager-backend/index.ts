import cors from 'cors';
import express from 'express';
import mongoose, { connect } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import { models } from './api/modeles';
import { resolvers } from './api/resolvers';
import { typeDefs } from './api/schema';
import { config } from './config';
import { envs } from './envs';
import { getUser } from './utils/getUser';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const pubsub = new PubSub();

const app = express();

const httpServer = createServer(app);

mongoose.set('strictQuery', true);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer(
  {
    schema,
    context: async (ctx, msg, args) => ({
      models, pubsub,
    }),
  },
  wsServer,
);

connect(config.mongoURI)
  .then(() => console.log('mongoDB connected'))
  .catch((error) => console.log(error));

const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = getUser(req.headers.authorization);

        return {
          models, user, pubsub,
        };
      },
    }),
  );

  httpServer.listen(envs.port, () => {
    console.log(`Server is running at http://localhost:${envs.port}${envs.graphqlPath}`);
  });
};
startApolloServer();
