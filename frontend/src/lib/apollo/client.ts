import { ApolloClient, InMemoryCache } from '@apollo/client'

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URI

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri,
})

export default apolloClient
