import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const httpProtocol = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_PROTOCOL
const uriAuthority = process.env.NEXT_PUBLIC_GRAPHQL_URI_AUTHORITY
const uriPath = process.env.NEXT_PUBLIC_GRAPHQL_URI_PATH
const wsProtocol = process.env.NEXT_PUBLIC_GRAPHQL_WS_PROTOCOL

const link =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: `${wsProtocol}://${uriAuthority}/${uriPath}`,
        })
      )
    : undefined

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${httpProtocol}://${uriAuthority}/${uriPath}`,
  link,
})

export default apolloClient
