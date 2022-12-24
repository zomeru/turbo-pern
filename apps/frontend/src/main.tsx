import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const URL = import.meta.env.VITE_GRAPHQL_URL;
// eslint-disable-next-line turbo/no-undeclared-env-vars
const URL_TWO = `https://${
  import.meta.env.VITE_GRAPHQL_HOST
}.onrender.com/graphql`;
const URL_FINAL = URL || URL_TWO || "'http://localhost:8000/graphql'";

const client = new ApolloClient({
  uri: URL_FINAL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
