import React from 'react'
import '../components.css'
import { DeleteRoomAcceptProps } from './roomInterface'

const DeleteRoomAccept: React.FC<DeleteRoomAcceptProps> = (props) => {

  const cancelHandler = (): void => {
    props.setToggleModalDelete(false)
  }
  const deleteHandler = (): void => {
    props.deleteHandler(props.id)
  }
  const closeHandler = (): void => props.setToggleModalDelete(false)

  return(
    <div className="modal-add-user-background">
      <div className="modal-delete-user-block">
      <div className="close-block">
          <div
            onClick={closeHandler}
            className="close-btn"
          >
            <span className="material-icons">close</span>
          </div>
      </div>
      <p className="delete-modal-text delete-modal-title">Delete room</p>
      <p className="delete-modal-text delete-modal-content">Are you sure you want to delete this room?</p>
      <div className="delete-modal-interface">
        <button
          className="cancel-modal-btn"
          onClick={cancelHandler}
        >
          cancel
        </button>
        <button
          className="delete-modal-btn"
          onClick={deleteHandler}
          >
            delete
          </button>
      </div>
      </div>
    </div>
  )
}

export { DeleteRoomAccept }