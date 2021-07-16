import { gql } from '@apollo/client'

const CREATE_ADMIN = gql`
  mutation addAdmin(
    $name: String!
    $email: String!,
    $phone: String!,
    $password: String!
  ){
    addAdmin(
      name: $name,
      email: $email,
      phone: $phone,
      password: $password
    ){
      id, name, email
    }
  }
`
export const GET_ADMIN = gql`
  query admin($email: String!, $password: String!){
    admin(email: $email, password: $password){
      id, password
    }
  }
`

export { CREATE_ADMIN }