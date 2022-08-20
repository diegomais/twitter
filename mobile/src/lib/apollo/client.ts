import { ApolloClient, InMemoryCache } from '@apollo/client'

const uri = 'http://localhost:3333/graphql'

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri,
})

export default apolloClient
