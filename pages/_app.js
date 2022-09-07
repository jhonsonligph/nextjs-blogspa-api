// import '../styles/globals.css'
import '../assets/scss/style.scss'
import client from '../libs/apollo'
import { ApolloProvider } from '@apollo/client'

import Layout from '../components/Layout'
import { AuthProvider } from '../context/auth'
import { UserContext } from '../context/UserContext';


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value="Hello contextAPI">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </ApolloProvider>
  )
}

export default MyApp
