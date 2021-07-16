import React, { useContext, useState } from 'react'
import '../components.css'
import { ReceptionistItemProps } from './stuffInterface'
import { AddUser } from './AddUser'
import { DeleteUserAccept } from './DeleteUserAccept'
import { Context } from '../../App'

const ReceptionistItem: React.FC<ReceptionistItemProps> = (props) => {
  const context = useContext<any>(Context)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const { name, email, phone, id, idx } = props

  const showDeleteHandler = (): void  => {
    setDeleteModal(true)
  }

  const showUpdateModalHandler = (): void => {
    setEditModal(true)
  }
  return (
    <div className="doctor-block">
      <div className="index-doctor receptionist list-element"><p>{idx + 1}</p></div>
      <div className="doctor-name list-element list-element-title-receptionist"><p className="list-title-name">{ name }</p></div>
      <div className="doctor-email list-element list-element-title-receptionist"><p>{ email }</p></div>
      <div className="doctor-number list-element list-element-title-receptionist"><p>{ phone }</p></div>
      {context.getUserType() === 'admin' &&
      <div className="receptionist-interface">
        <div onClick={showDeleteHandler} className="interface-element">
            <span className="material-icons">delete_outline</span>
          </div>
          <div onClick={showUpdateModalHandler} className="interface-element">
            <span className="material-icons">edit</span>
        </div>
      </div>
      }
      {editModal && <AddUser 
          closeModal={props.setModalToggle} 
          userData={{
          name: props.name,
          email: props.email,
          phone: props.phone,
          option: true,
          id: props.id,
          allerts: ""
          }} 
          type="Edit"
        />
      }
      {deleteModal && <DeleteUserAccept 
          deleteDoctor={props.deleteReceptionist} setDeleteModal={setDeleteModal} 
          id={id}
        />
      }
    </div>
  )
}

export { ReceptionistItem }