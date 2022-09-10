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