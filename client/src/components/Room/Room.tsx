import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_DOCTOR_ROOM, UPDATE_DOCTOR_ROOMS } from '../../query/doctor'
import { DELETE_ROOM } from '../../query/room'
import { AddRoom } from './AddRoom'
import '../components.css'
import { RoomProps } from './roomInterface'
import { DeleteRoomAccept } from './DeleteRoomAccept'

const Room: React.FC<RoomProps> = (props) => {
  const [toggleModalDelete, setToggleModalDelete] = useState(false)
	const [editToggle, setEditToggle] = useState<boolean>(false)
  const [deletedRoom] = useMutation(DELETE_ROOM)
  const rooms = useQuery(GET_DOCTOR_ROOM, {
    skip: true
  })
  const [updatedDoctorRooms] = useMutation(UPDATE_DOCTOR_ROOMS)
  const { backToDrag, id, title, doctorName } = props
  const backHandler = () => {
    if(props.setAddedRooms){
      props.setAddedRooms((state: any) => {
        state.filter((el: any) => el.id !== id)
      })
    }
    backToDrag(id)
  }

	const showEdit = (): void => setEditToggle(true)
	const closeEdit = (): void => setEditToggle(false)

  const deleteHandler = (id: string) => {
    if (doctorName.length > 0) {
      return rooms.fetchMore({
        variables: {
          name: doctorName
        }
      }).then(res => {
        const doctorRooms = res.data.doctorRoom.room  
        const newdoctorRooms = doctorRooms.replace(`${title}`, '')
        updatedDoctorRooms({
          variables: {
            name: doctorName,
            room: newdoctorRooms
          }
        }).then(res => {
          deletedRoom({
            variables: {
              id
            }
          }).then(res => {
            if (res && props.setMountForce) {
              props.setMountForce((state: number) => state + 1)
            }
          })
        })
      })
    }
    deletedRoom({
      variables:{
        id
      }
    }).then((res) => {
      if(res && props.setMountForce){
        setToggleModalDelete(false)
        props.setMountForce((state: number) => state + 1)
      }
    })
  }

	return (
		<div 
    className="room-block"
    ref={props.innerRef}
    {...props.draggableProps}
    {...props.dragHandleProps}
    >
			<div className="room-header">
				<div className="room-remove">
        <span 
        onClick={props.type === 'FromDrag' ? () => setToggleModalDelete(true) : () => backHandler()} 
        className="material-icons room-icon">
          clear
        </span>
				</div>
				<div className="room-edit">
        <span onClick={showEdit} className="material-icons room-icon">mode</span>
				</div>
			</div>
			<div className="room-info">
				<div className="room-title">{title}</div>
				<p className="doctor-room">{props.doctorName}</p>
			</div>
			{ editToggle &&
			<AddRoom
				id={id}
				type="Edit"
				closeModal={closeEdit}
				titleRoom={title}
        setMountForce={props.setMountForce}
			/>
			}
      { toggleModalDelete &&
      <DeleteRoomAccept 
        setToggleModalDelete={setToggleModalDelete}
        id={props.id}
        title={props.title}
        deleteHandler={deleteHandler}
      />
      }
		</div>
	)
}

export { Room }
