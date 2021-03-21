import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BaseStyles, theme } from '@primer/components';
import { ThemeProvider } from 'styled-components';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const GH_TOKEN = '<GH_TOKEN>';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${GH_TOKEN}`,
  },
});

render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BaseStyles>
        <App />
      </BaseStyles>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('app')
);
