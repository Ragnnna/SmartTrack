import React, { useContext, useState } from 'react'
import '../components.css'
import { AssistanceItemProps } from './stuffInterface'
import { AddUser } from './AddUser'
import { DeleteUserAccept } from './DeleteUserAccept'
import { Context } from '../../App'

const AssistanceItem: React.FC<AssistanceItemProps> = (props) => {
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
      <div
        className="index-doctor assistance list-element">
        <p>{idx + 1}</p>
      </div>
      <div
        className="doctor-name list-element list-element-title-assistance">
          <p className="list-title-name">{ name }</p>
      </div>
      <div
        className="doctor-email list-element list-element-title-assistance">
          <p>{ email }</p>
      </div>
      <div
        className="doctor-number list-element list-element-title-assistance">
          <p>{ phone }</p>
      </div>
      { context.getUserType() === 'admin' &&
      <div className="assistance-interface">
        <div className="interface-element">
          <span className="material-icons">edit_calendar</span>
        </div>
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
          closeModal={props.setModalToggle} 
          userData={{
          name: props.name,
          email: props.email,
          phone: props.phone,
          option: true,
          allerts: "",
          id: props.id
          }} 
          type="Edit"
        />
      }
      {deleteModal && <DeleteUserAccept 
          deleteDoctor={props.deleteAssistante}
          setDeleteModal={setDeleteModal} 
          id={id}
        />
      }
    </div>
  )
}

export { AssistanceItem }