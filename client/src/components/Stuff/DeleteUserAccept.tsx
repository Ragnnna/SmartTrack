import React from 'react'
import { useHistory } from 'react-router-dom'
import '../components.css'
import { DeleteUserAcceptProps } from './stuffInterface'

const DeleteUserAccept: React.FC<DeleteUserAcceptProps> = (props) => {

  const history = useHistory()
  const cancelHandler = (): void => {
    props.setDeleteModal(false)
  }
  const typeUserString = history.location.pathname.split('/')[2]
  const deleteHandler = (): void => {
    props.deleteDoctor(props.id, props.doctorName)
  }
  const closeHandler = (): void => props.setDeleteModal(false)

  const userType =  typeUserString === 'doctors' ? 'doctor' 
  : typeUserString === 'receptionist' ? 'receptionist' 
  :  'assitance'
  return(
    <div className="modal-add-user-background">
      <div className="modal-delete-user-block">
      <div className="close-block">
          <div onClick={closeHandler} className="close-btn">
            <span className="material-icons">close</span>
          </div>
      </div>
      <p className="delete-modal-text delete-modal-title">Delete {userType}</p>
      <p className="delete-modal-text delete-modal-content">Are you sure you want to delete this {userType}?</p>
      <div className="delete-modal-interface">
        <button className="cancel-modal-btn" onClick={cancelHandler}>cancel</button>
        <button className="delete-modal-btn" onClick={deleteHandler}>delete</button>
      </div>
      </div>
    </div>
  )
}

export { DeleteUserAccept }
