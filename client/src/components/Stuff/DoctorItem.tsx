import React, { useContext, useState } from 'react'
import '../components.css'
import { DoctorItemProps } from './../componentsInterfaces'
import { DeleteUserAccept } from './DeleteUserAccept'
import { AddUser } from './AddUser'
import { normalizeColor } from '../../projectdata/SideMethods'
import { Context } from '../../App'


const DoctorItem: React.FC<DoctorItemProps> = (props) => {
  const context = useContext<any>(Context)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [editModal, setEditModal] = useState<boolean>(false)
  const { name, email, phone, room, allerts, id, idx } = props
  const allertsArray = !allerts ? [] : JSON.parse(allerts)
  const showRooms = room.length > 1 
  ? room
    .split(',')
    .filter(el => el !== '')
    .slice(0, 3)
    .join(', ') 
  : "Not found"
  const showRoomsTitle = room.length > 1 
  ? room
    .split(',')
    .filter(el => el !== '')
    .join(', ') 
  : "Not found"
  
  const showDeleteHandler = (): void  => { 
    setDeleteModal(true)
  }
  
  const showUpdateModalHandler = (): void => {
    setEditModal(true)
  }

  const allertsMapped = allertsArray
  .filter((el: any) => el.title !== 'empty')
  .map((el: any) => {
    return (
    <div 
      key={el.id}
      style={{backgroundColor: normalizeColor(el.color)}}
      title={el.title}
      className="allert-mini">
    </div>)
  })

  return (
    <div className="doctor-block">
      <div
        className="index-doctor list-element">
          <p>{idx! + 1}</p>
      </div>
      <div
        className="doctor-name list-element list-element-title">
          <p className="list-title-name">{ name} </p>
      </div>
      <div
        className="doctor-email list-element list-element-title">
          <p>{ email }</p>
      </div>
      <div
        className="doctor-number list-element list-element-title">
          <p>{ phone }</p>
      </div>
      <div
        className="doctor-status list-element list-element-title">
          {allertsMapped}
      </div>
      <div
        className="doctor-rooms list-element list-element-title"
        title={showRoomsTitle}>
          <p>Rooms {showRooms}</p>
      </div>
      { context.getUserType() === 'admin'&&
      <div className="doctor-interface">
        <div
          onClick={showDeleteHandler}
          className="interface-element">
            <span className="material-icons">delete_outline</span>
        </div>
        <div
          onClick={showUpdateModalHandler}
          className="interface-element">
            <span className="material-icons">edit</span>
        </div>
      </div>
      }
      {editModal && <AddUser 
          closeModal={props.setModalToggle!} 
          userData={{
          name: props.name,
          email: props.email,
          phone: props.phone,
          option: true, 
          allerts:props.allerts,
          id: props.id
          }} 
          type="Edit"
        />
      }
      {deleteModal && 
        <DeleteUserAccept
          deleteDoctor={props.deleteDoctor!} 
          setDeleteModal={setDeleteModal}
          doctorName={name}
          id={id}
        />
      }
    </div>
    )
}

export { DoctorItem }