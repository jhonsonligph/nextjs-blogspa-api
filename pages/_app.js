// import '../styles/globals.css'
import { useEffect, useContext } from 'react'
import '../assets/scss/style.scss'
import client from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'

import Layout from '../components/Layout'
import { AuthProvider } from '../context/auth'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
