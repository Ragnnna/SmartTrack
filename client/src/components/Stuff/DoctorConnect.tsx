import React from 'react'
import '../components.css'
import { DoctorConnectProps } from './stuffInterface'

const DoctorConnect: React.FC<DoctorConnectProps> = (props) => {
  const { 
    name,
    email,
    room,
    idx,
    connected,
    updateConnectionHandler,
    id
  } = props
  
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

  const connectState = connected ? "Disconnect" : "Connect to"

  const submitHandler = () => {
    const connection = !connected
    updateConnectionHandler(id, connection)
  }

  return (
    <div
      className={ connected 
        ? "doctor-connect-block doctor-connect-block-active" 
        :"doctor-connect-block"
      }>
      <div className={ connected 
        ? "number-connect-doctor number-connect-doctor-active" 
        : "number-connect-doctor"
      }>
        <p>{ idx }</p>
      </div>
      <div className="element-connect element-connect-name">
        <p>{ name }</p>
      </div>
      <div className="element-connect">
        <p>{ email }</p>
      </div>
      <div title={showRoomsTitle} className="element-connect">
        <p>{ showRooms }</p>
      </div>
      <div className="element-connect">
        <button
        onClick={submitHandler}
        className={ 
          connected 
          ? "btn-connect btn-connect-active" 
          : "btn-connect"
        }>
          { connectState }
        </button>
      </div>
    </div>
  )
}

export { DoctorConnect }
