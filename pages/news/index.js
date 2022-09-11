import { useEffect, useContext } from 'react'
import { gql } from "@apollo/client";
import client from "../../lib/apollo";
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import { AuthContext } from '../../context/auth'



export default function Posts({ posts }) {
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    isLoggedIn()
  }, [])

  // if (!posts) return

  return (
    <>
      <Head>
        <title>{`News Archives`}</title>
      </Head>
      <section className="news-archive l-container">
        <ul className="news-list">
          {posts?.map(({ id, title, createdAt, image }) => {
            const no_image = 'https://dummyimage.com/1280x720/000/fff.jpg&text=No+Image'
            const check_image = image != undefined ? image : no_image
            return (
              <li className="news-item" key={id}>
                <article className="news-card">
                  <Link href={`/news/${id}`}>
                    <a><div className="news-card-eyecatch" style={{ backgroundImage: `url(${check_image})` }}></div></a>
                  </Link>
                  <div className="news-card-body">
                    <p className="news-card-date">{moment(createdAt).format("YYYY[.]MM[.]DD")}</p>
                    <h3 className="news-card-title">{title}</h3>
                  </div>
                </article>
              </li>)
          })}
        </ul>
      </section>
    </>
  )
}

// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: gql`
//       query GET_POST($id: Int){
//         post(id: $id) {
//           id
//           title
//           content
//           createdAt
//           image
//           comments {
//             id
//             content
//             createdAt
//           }
//         }
//       }
//     `,
//     variables: { id: 3 },
//   });

//   return {
//     props: {
//       posts: data.post,
//     },
//   };
// }

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Posts($limit: Int) {
        posts(pagination: { limit: $limit }) {
          id
          title
          image
          content
          createdAt
        }
      }
    `,
    variables: { limit: -1 },
  });

  return {
    props: {
      posts: data.posts,
    },
  };
}