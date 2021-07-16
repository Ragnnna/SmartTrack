import { gql } from '@apollo/client'

export const GET_RECEPTIONISTS = gql`
  query {
    receptionists {
      id, name, email, phone
    }
  }
`
export const GET_RECEPTIONIST = gql`
  query receptionist($email: String!, $password: String!){
    receptionist(email: $email, password: $password) {
      id, password
    }
  }
`

export const CREATE_RECEPTIONIST = gql`
  mutation addiReceptionist(
    $name: String!,
    $email: String!,
    $password: String!,
    $phone: String!
    ){
      addiReceptionist(
        name: $name,
        email: $email,
        password: $password,
        phone: $phone
        ){
          id, name, email
      }
    }
`
export const UPDATE_RECEPTIONIST = gql`
  mutation updateReceptionist(
    $id: String!
    $name: String!,
    $email: String!,
    $phone: String!
    ){
      updateReceptionist(
        id: $id,
        name: $name,
        email: $email,
        phone: $phone
        ){
          id, name, email, phone
      }
    }
`

export const DELETE_RECEPTIONIST = gql`
  mutation deleteReceptionist(
    $id: String!
  ){
    deleteReceptionist(id: $id){
      id, name, email
    }
  }
`