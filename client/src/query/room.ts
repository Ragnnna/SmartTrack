import { gql } from '@apollo/client'

export const CREATE_ROOM = gql`
  mutation addRoom($title: String, $doctorName: String){
    addRoom(title: $title, doctorName: $doctorName){
      title, doctorName
    }
  }
`
export const GET_ROOMS = gql`
  query{
    rooms{
      id, title, doctorName
    }
  }
`

export const DELETE_ROOM = gql`
  mutation deleteRoom($id: String){
    deleteRoom(id: $id){
      title
    }
  }
`
export const DELETE_ROOMS_AFTER_DOCTOR = gql`
  mutation deleteRoomsAfterDoctor($doctorName: String){
    deleteRoomsAfterDoctor(doctorName: $doctorName){
      title
    }
  }
`

export const ADD_ROOMS = gql`
  mutation addRooms($rooms: String){
    addRooms(rooms: $rooms){
      title
    }
  }
`

export const SET_ROOM_DOCTOR_NAME = gql`
  mutation setRoomDoctorName($doctorName: String){
    setRoomDoctorName(doctorName: $doctorName){
      title
    }
  }
`

export const UPDATE_ROOM_DOCTOR_NAME = gql`
  mutation updateRoomDoctorName($title: String, $doctorName: String){
    updateRoomDoctorName(title: $title, doctorName: $doctorName){
      title
    }
  }
`

export const UPDATE_ROOM = gql`
  mutation updateRoom($id: String, $title: String, $doctorName: String){
    updateRoom(id: $id, title: $title, doctorName: $doctorName){
      title
    }
  }
`