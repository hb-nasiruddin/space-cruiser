import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_ENDPOINT } from '@config/index';

// Create a new Apollo Client instance
export const client = new ApolloClient({
  // Configure the client with the GraphQL API endpoint URL
  uri: API_ENDPOINT,

  // Use InMemoryCache to cache query results for improved performance and reduced network requests
  cache: new InMemoryCache(),
});
