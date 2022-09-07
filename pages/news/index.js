import { gql } from "@apollo/client";
import client from "../../libs/apollo";
import Head from 'next/head'


export default function Posts({ posts }) {
  // TODO: Build Cards with Characters Data
  if (!posts) return

  return (
    <>
      <Head>
        <title>{`NextJS | Articles`}</title>
      </Head>
      {/* <h1>{posts.id} | {posts.title}</h1> */}
      {posts?.map(({ id, title, content }) => (
        <div key={id}>
          <h1>{title}—{id}</h1>
          <div>
            <p>{content}</p>
          </div>
        </div>
      ))}
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
          content
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