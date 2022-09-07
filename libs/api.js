

const API_URL = process.env.GRAPHQL_SERVER

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllPosts() {
  const { data } = await fetchAPI(`
    {
      posts {
        id
      }
    }
  `)

  // console.log(data)

  return data.posts
}

export async function getPost(postID) {
  const data = await fetchAPI(`
    query PostByID($id: Int) {
      post(id: $id) {
        title
        content
      }
    }
  `,
    {
      variables: {
        id: postID
      }
    }
  )

  return data
}
