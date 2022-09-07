import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login(
  $username: String!
  $password: String!
){
  login(username: $username, password: $password,) {
    id
    email
    token
    username
    createdAt
  }
}
`

export const AUTHENTICATE_USER = gql`
mutation Login($email: String!, $password: String!) {
  authenticate(email: $email, password: $password)
}
`