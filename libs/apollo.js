import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, ApolloProvider, concat } from "@apollo/client"

const httpLink = createHttpLink({ uri: process.env.GRAPHQL_SERVER })
const authMiddleware = new ApolloLink((operation, forward) => {
  // const token = localStorage.getItem('jwtToken')
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }))
  return forward(operation);
})

const client = new ApolloClient({
  // link: concat(authMiddleware, httpLink),
  uri: process.env.GRAPHQL_SERVER,
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          comments: {
            merge(existing, incoming) {
              return incoming;
            }
          },
        }
      },
    },
  }),
});

export default client