const ENV = {
  dev: {
    envName: 'DEVELOPMENT',
    gqlHttpProtocol: 'http',
    gqlUriAuthority: 'localhost:4000',
    gqlUriPath: 'graphql',
    gqlWsProtocol: 'ws',
  },
  prod: {
    envName: 'PRODUCTION',
    gqlHttpProtocol: 'https',
    gqlUriAuthority: 'diegomais-twitter.herokuapp.com',
    gqlUriPath: 'graphql',
    gqlWsProtocol: 'wss',
  },
}

export const getEnvironment = () => {
  return process?.env?.NODE_ENV === 'development' ? ENV.dev : ENV.prod
}
