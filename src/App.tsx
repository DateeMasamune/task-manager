import React from 'react';
import { ThemeProvider } from '@mui/material';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws';
import {
  ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { SnackbarContextProvider } from './components/SnackbarContext';
import { JusticeTaskManagerContextProvider } from './components/JusticeTaskManagerContext';
import { JusticeBoardRoutes } from './components/JusticeBoardRoutes';
import { theme } from './theme';
import './index.css';
import { myUser } from './utils/myUser';

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:5000/graphql',
  }),
);

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, { headers }) => {
  const { token } = myUser();
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache({ addTypename: false }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SnackbarContextProvider>
          <JusticeTaskManagerContextProvider>
            <JusticeBoardRoutes />
          </JusticeTaskManagerContextProvider>
        </SnackbarContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
