import { ApolloClient, InMemoryCache } from '@apollo/client';

const Config = {
  host: 'http://localhost:8080/graphql',
};

export const client = new ApolloClient({
  uri: Config.host,
  cache: new InMemoryCache(),
});
