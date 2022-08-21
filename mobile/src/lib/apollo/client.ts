import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getEnvironment } from '../../config/environment'

const { gqlHttpProtocol, gqlUriAuthority, gqlUriPath, gqlWsProtocol } =
  getEnvironment()

const link = new GraphQLWsLink(
  createClient({
    url: `${gqlWsProtocol}://${gqlUriAuthority}/${gqlUriPath}`,
  })
)

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${gqlHttpProtocol}://${gqlUriAuthority}/${gqlUriPath}`,
  link,
})

export default apolloClient
