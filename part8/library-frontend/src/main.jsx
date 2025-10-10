import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { 
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink
} from '@apollo/client'

import { ApolloProvider } from '@apollo/client/react'
import { SetContextLink } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = new SetContextLink((_, { headers }) => {
  const token = window.localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST

const BACKEND_URI = BACKEND_HOST || 'http://localhost:4000'

const WS_BACKEND_URL = BACKEND_HOST 
  ? 'ws://' + window.location.host + BACKEND_HOST 
  : 'http://localhost:4000'

const httpLink = new HttpLink({ uri: BACKEND_URI})

const wsLink = new GraphQLWsLink(
  createClient({ url: WS_BACKEND_URL})
)

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  }, 
  wsLink,
  authLink.concat(httpLink)
)


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
