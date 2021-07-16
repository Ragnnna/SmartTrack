import { gql } from '@apollo/client'

export const GET_DOCTORS = gql`
  query {
    doctors {
      id, name, email, phone, room, allerts, connected
    }
  }
`
export const GET_DOCTOR = gql`
  query doctor($email: String!, $password: String!){
    doctor(email: $email, password: $password) {
      id, password
    }
  }
`
export const GET_DOCTOR_BY_ID = gql`
  query doctorById($id: String!){
    doctorById(id: $id){
      email, allerts
    }
  }
`

export const CREATE_DOCTOR = gql`
  mutation addDoctor(
    $name: String!,
    $email: String!,
    $password: String!,
    $phone: String!,
    $room: String!,
    $allerts: String!,
    $connected: Boolean!
    ){
      addDoctor(
        name: $name,
        email: $email,
        password: $password,
        phone: $phone,
        room: $room,
        allerts: $allerts,
        connected: $connected
        ){
          id, name, email, room, allerts
      }
    }
`
export const UPDATE_DOCTOR = gql`
  mutation updateDoctor(
    $id: String!
    $name: String!,
    $email: String!,
    $phone: String!,
    $allerts: String!
    ){
      updateDoctor(
        id: $id,
        name: $name,
        email: $email,
        phone: $phone,
        allerts: $allerts
        ){
          id, name, email, allerts
      }
    }
`
export const UPDATE_DOCTOR_CONNECTION = gql`
  mutation updateDoctorConnection(
    $id: String!
    $connected: Boolean!
  ){
    updateDoctorConnection(id: $id, connected: $connected){
      name
    }
  }
`

export const UPDATE_DOCTOR_ROOMS = gql`
  mutation updateDoctorRooms(
    $name: String!
    $room: String!
    ){
      updateDoctorRooms(
        name: $name,
        room: $room
        ){
          id, name, email, room
      }
    }
`
export const GET_DOCTOR_ROOM = gql`
  query doctorRoom($name: String!){
    doctorRoom(name: $name) {
      room, name
    }
  }
`

export const UPDATE_DOCTOR_BY_EMAIL = gql`
  mutation updateDoctorAllerts($email: String!, $allerts: String!){
    updateDoctorAllerts(email: $email, allerts: $allerts){
      name
    }
  } 
`

export const GET_DOCTOR_BY_EMAIL = gql`
  query doctorByEmail($email: String){
    doctorByEmail(email: $email){
      allerts
    }
  }
`

export const DELETE_DOCTOR = gql`
  mutation deleteDoctor(
    $id: String!
  ){
    deleteDoctor(id: $id){
      id, name, email
    }
  }
`






