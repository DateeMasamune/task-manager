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
  // const { token } = useUser();
  const { token } = { token: null };
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <JusticeTaskManagerContextProvider>
          <SnackbarContextProvider>
            <JusticeBoardRoutes />
          </SnackbarContextProvider>
        </JusticeTaskManagerContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
