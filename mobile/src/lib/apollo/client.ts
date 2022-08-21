import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const uriAuthority = 'localhost:4000'

const link = new GraphQLWsLink(
  createClient({
    url: `ws://${uriAuthority}/graphql`,
  })
)

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `http://${uriAuthority}/graphql`,
  link,
})

export default apolloClient
