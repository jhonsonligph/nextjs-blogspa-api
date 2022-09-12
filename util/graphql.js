import { gql } from '@apollo/client'

export const AUTHENTICATE_USER = gql`
mutation Authenticate($email: String!, $password: String!) {
  authenticate(email: $email, password: $password)
}
`

export const REGISTER_USER = gql`
mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
`

export const SLIDER_QUERY = gql`
query Posts($limit: Int) {
  posts(pagination: { limit: $limit }) {
    id
    title
    image
    createdAt
  }
}`

export const FETCH_ALL_NEWS = gql`
query Posts($limit: Int) {
  posts(pagination: { limit: $limit }) {
    id
    title
    image
    content
    createdAt
  }
}`

export const FETCH_NEWS_QUERY = gql`
query Posts($offset: Int) {
  posts(pagination: { offset: $offset }) {
    id
    title
    image
    content
    createdAt
  }
}`

export const ADD_POST_MUTATION = gql`
mutation addPost($title: String, $content: String) {
  addPost(post: {
    title: $title,
    content: $content
  }) {
    id
    title
    image
    content
    createdAt
  }
}
`

export const ADD_COMMENT_ON_POST_MUTATION = gql`
  mutation ADD_COMMENT($id: Int!, $content: String!) {
    addComment(postId: $id, content: $content) {
      id
      content
      createdAt
  }
}
`