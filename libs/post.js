import client from './apollo'

export async function getPostData(postID) {
  const { data } = await client.query({
    query: gql`
      query($id: Int){
        post(id: $id) {
          id
          title
          content
          createdAt
          image
          comments {
            id
            content
            createdAt
          }
        }
      }
    `,
    variables: { id: postID },
  });

  return data;
}