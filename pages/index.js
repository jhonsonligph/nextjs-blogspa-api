import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import client from '../libs/apollo'
import { gql } from "@apollo/client";
import moment from 'moment'

import Carousel from '../components/Carousel'
import Login from '../components/Login'
import Register from '../components/Register'


export default function Home({ posts }) {
  return (
    <>
      <section className="news-header">
        <Carousel />
      </section>

      <section>
        <Login />
        <Register />
      </section>

      <section className="news-archive l-container">
        <ul className="news-list">
          {posts?.map(({ id, title, createdAt, image }) => (
            <li className="news-item" key={id}>
              <article className="news-card">
                <Link href={`/news/${id}`}>
                  <a><div className="news-card-eyecatch" style={{ backgroundImage: `url('${image}')` }}></div></a>
                </Link>
                <div className="news-card-body">
                  <p className="news-card-date">{moment(createdAt).format("YYYY[.]MM[.]DD")}</p>
                  <h3 className="news-card-title">{title}</h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
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
