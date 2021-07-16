import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import '../components/components.css'
import { DragArea } from '../components/Room/DragArea'
import { SequenceAllert } from '../components/Room/SequenceAllert'
import { Room } from '../components/Stuff/stuffInterface'
import { EventSelect } from '../projectdata/types'
import { GET_DOCTORS, GET_DOCTOR_ROOM,  UPDATE_DOCTOR_ROOMS } from '../query/doctor'
import { ADD_ROOMS } from '../query/room'
import './pages.css'

const Sequence = () => {
  const [sequenceModal, setSequenceModal] = useState(false)
  const [addedRooms, setAddedRooms] = useState<Room[]>([])
  const [doctorName, setDoctorName] = useState<any>('')
  const [roomList, setRoomList] = useState<string[]>([])
  const [mountForce, setMountForce] = useState<number>(0)
  const [doctors, setDoctors] = useState<any>([])
  const { data, loading } = useQuery(GET_DOCTORS)
  const [updatedDoctorRooms] = useMutation(UPDATE_DOCTOR_ROOMS)
  const [addedRoomsName] = useMutation(ADD_ROOMS)
  const rooms = useQuery(GET_DOCTOR_ROOM, {
    skip: true
  })
  useEffect(() => {
    if(!loading){
      setDoctors(data.doctors)
    }
  }, [data, loading])
  const mappedOptions = () => {
    return doctors.map((el: any) => {
      return <option key={el.id} value={el.name}>{el.name}</option>
    })
  }

  const setRoomsDoctorNames = () => {
    const rooms = addedRooms.map(el => {
      return { ...el, doctorName: doctorName }
    })
    return rooms
  }

  const changeHandler = (e: EventSelect) => {
    setDoctorName(e.currentTarget.value)
  }

  const submitHandler = () => {
    if(!doctorName){
      return
    }
    rooms.fetchMore({
      variables: {
        name: doctorName
      }
    }).then(res => {
      if(res.data.doctorRoom){
        const room = res.data.doctorRoom.room
        updatedDoctorRooms({
          variables: {
            name: doctorName,
            room: room + ',' + roomList
          }
        }).then(res => {
          if(res){
            addedRoomsName({
              variables: {
                rooms: JSON.stringify(setRoomsDoctorNames())
              }
            })
            setAddedRooms([])
            setSequenceModal(true)
          }
        })
      }
    })
  }

  return (
    <div className="sequence-page">
      <div className="header-sequence">
        <div className="choose-doctor">
          <p>Choose a Doctor</p>
          <select onChange={changeHandler} value={doctorName} className="select">
            <option value={''} disabled>Choose</option>
            { mappedOptions() }
          </select>
        </div>
        <div className="add-btn-block text-center">
          <button onClick={submitHandler} >Save</button>
        </div>
      </div>
      <div>
        <DragArea
          key={mountForce}
          addedRooms={addedRooms}
          setMountForce={setMountForce}
          setRoomList={setRoomList}
          setAddedRooms={setAddedRooms}
        />
      </div>
      {sequenceModal && 
        <SequenceAllert 
          setSequenceModal={setSequenceModal}
        />
      }
    </div>
  )
}

export { Sequence }
