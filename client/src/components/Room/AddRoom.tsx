import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { checkRequiredAndLength } from '../../projectdata/SideMethods'
import { EventChange } from '../../projectdata/types'
import { CREATE_ROOM, UPDATE_ROOM } from '../../query/room'
import '../components.css'
import { AddRoomProps } from './roomInterface'

const AddRoom: React.FC<AddRoomProps> = (props) => {
  const { closeModal, type, id, titleRoom, setMountForce } = props
  const [title, setTitle] = useState<string>('')
  const changeHandler = (e: EventChange) => setTitle(e.currentTarget.value)
  const [newRoom] = useMutation(CREATE_ROOM)
  const [updatedRoom] = useMutation(UPDATE_ROOM)

  useEffect(() => {
    if(type === 'Edit'){
      setTitle(titleRoom!)
    }
  }, [titleRoom, type])

  const submitHandler = () => {
    if (!checkRequiredAndLength(title, 1, 3)) {
      return
    }
    if (type === "Edit") {
      return updatedRoom({
        variables: {
          id,
          title: title,
          doctorName: ''
        }
      }).then(res => {
        if(res && setMountForce){
          setMountForce((state: number) => state + 1)
          closeModal()
        }
      })
    }
    newRoom({
      variables: {
        title,
        doctorName: ''
      }
    }).then(res => {
      if(res && setMountForce){
        setMountForce((state: number) => state + 1)
        closeModal()
      }
    })
  }
  
  return (
    <div className="add-room-background">
      <div className="add-room-block">
        <div className="close-block">
          <div
            onClick={() => closeModal()}
            className="close-btn"
          >
            <span className="material-icons">close</span>
          </div>
        </div>
        <p className="add-room-title">{type} Room</p>
        <div className="allert-modal-input-element">
          <label htmlFor="">
            <span className="input-element-title">Name</span>
            <input
              type="text"
              onChange={changeHandler}
              value={title}
              className="allert-modal-input input-element-modal"
            />
          </label>
        </div>
        <div className="add-btn-block">
          <button
            onClick={submitHandler}
            className="btn-allert-modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export { AddRoom }
