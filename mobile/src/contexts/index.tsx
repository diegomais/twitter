import { ApolloProvider } from '@apollo/client'
import React, { PropsWithChildren } from 'react'
import apolloClient from '../lib/apollo/client'

import { AuthProvider, useAuth } from './auth'

const AppProvider = ({ children }: PropsWithChildren) => (
  <ApolloProvider client={apolloClient}>
    <AuthProvider>{children}</AuthProvider>
  </ApolloProvider>
)

export default AppProvider

export { useAuth }
