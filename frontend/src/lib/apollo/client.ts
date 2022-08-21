import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const uriAuthority =
  process.env.NEXT_PUBLIC_GRAPHQL_URI_AUTHORITY ?? 'localhost:4000'

const link =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: `ws://${uriAuthority}/graphql`,
        })
      )
    : undefined

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `http://${uriAuthority}/graphql`,
  link,
})

export default apolloClient
