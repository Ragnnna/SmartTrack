import { gql } from '@apollo/client'

export const GET_ASSISTANTES = gql`
  query {
    assistantes{
      id, name, email, phone
    }
  }
`
export const GET_ASSISTANTE = gql`
  query assistant($email: String!, $password: String!){
    assistant(email: $email, password: $password){
      id, password
    }
  }
`

export const CREATE_ASSISTANTE = gql`
  mutation addAssistante(
    $name: String!,
    $email: String!,
    $password: String!,
    $phone: String!
    ){
      addAssistante(
        name: $name,
        email: $email,
        password: $password,
        phone: $phone
        ){
          id, name, email
      }
    }
`
export const UPDATE_ASSISTANTE = gql`
  mutation updateAssistante(
    $id: String!
    $name: String!,
    $email: String!,
    $phone: String!
    ){
      updateAssistante(
        id: $id,
        name: $name,
        email: $email,
        phone: $phone
        ){
          id, name, email, phone
      }
    }
`

export const DELETE_ASSISTANTE = gql`
  mutation deleteAssistant(
    $id: String!
  ){
    deleteAssistant(id: $id){
      id, name, email
    }
  }
`