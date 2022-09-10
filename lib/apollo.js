import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, concat } from "@apollo/client"

const httpLink = createHttpLink({ uri: process.env.GRAPHQL_SERVER })
const authMiddleware = new ApolloLink((operation, forward) => {
  let token
  // START_NEXTJS (Check window)
  const IS_SERVER = typeof window === 'undefined'
  if (!IS_SERVER) token = localStorage.getItem('authToken')
  // END_NEXTJS

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }))
  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
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