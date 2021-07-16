import { gql } from '@apollo/client'

export const GET_ALLERTS = gql`
  query{
    allerts{
      id, title, color, isActive
    }
  }
`
export const UPDATE_ALLERT = gql`
  mutation updateAllert(
    $id: String!
    $color: String!
    $title: String!
    ){
      updateAllert(
        id: $id,
        color: $color
        title: $title,
        ){
          id, title, isActive
      }
    }
`
export const ADD_ALLERT = gql`
  mutation addAllert(
    $isActive: Boolean!
    $color: String!
    $title: String!
    ){
      addAllert(
        title: $title,
        color: $color,
        isActive: $isActive
        ){
          id, title, color
      }
    }
`