import { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import client from '../lib/apollo'
import { gql } from "@apollo/client"
import { withRouter } from 'next/router'

import Login from '../components/Login'
import Register from '../components/Register'
import Carousel from '../components/Carousel'
import { AuthContext } from '../context/auth'
import News from '../components/News'

const Home = ({ posts, router: { query: logUser } }) => {
  const { auth, open, register, isLoggedIn, isOpen } = useContext(AuthContext)
  const isLoginRegister = () => isOpen()

  // ON_MOUNT
  useEffect(() => {
    isLoggedIn()
    // console.log('LogUser::', logUser)
    if (!auth && Object.keys(logUser).length > 0) {
      isOpen()
    }
  }, [])

  return (
    <>
      <Head>
        <title>BLOG SPA | Career Goals</title>
        <meta name="description" content="Cody_FY2022_2nd half evaluation(4/2022 - 9/2022)" />
      </Head>
      <section className="news-header">
        {open ? (
          <>
            <div className="form">
              {register ? <Register /> : <Login />}
            </div>
          </>
        ) : <Carousel />}
      </section>
      <section className="news-archive l-container">
        <News posts={posts} />
      </section>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Posts($offset: Int) {
        posts(pagination: { offset: $offset }) {
          id
          title
          image
          content
          createdAt
        }
      }
    `,
    variables: { offset: 3 },
  });

  return {
    props: {
      posts: data?.posts,
    },
  };
}

export default withRouter(Home)