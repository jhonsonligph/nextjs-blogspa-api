import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, concat, HttpLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER,
  fetchOptions: {
    mode: 'cors',
  }
})

const link = new HttpLink({
  uri: process.env.GRAPHQL_SERVER,
  fetchOptions: {
    mode: 'cors',
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const IS_SERVER = typeof window === 'undefined'// NEXTJS (Polyfill window???)
  if (!IS_SERVER)
    operation.setContext(({ headers = {} }) => {
      const auth = {
        headers: {
          ...headers,
          authorization: localStorage.getItem('authToken') || ''
        }
      }
      console.log('HEADERS:', auth.headers)
      return auth
    })
  return forward(operation);
})

const client = new ApolloClient({
  // link: concat(authMiddleware, httpLink),
  link: concat(authMiddleware, link),
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