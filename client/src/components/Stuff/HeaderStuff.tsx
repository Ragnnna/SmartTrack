import React, { useContext }  from 'react'
import '../components.css'
import { AddUser } from './AddUser'
import { NavLink, useHistory } from 'react-router-dom'
import { HeaderStuffProps } from '../componentsInterfaces'
import { Context } from '../../App'

const HeaderStuff: React.FC<HeaderStuffProps> = (props) => {
  const context = useContext<any>(Context)
  const history = useHistory()
  const typeUserString = history.location.pathname.split('/')[2]
  const openModal = () => {
    props.setModalToggle(true)
  }

  const closeModal = () => {
    props.setModalToggle(false)
  }

  return (
    <div className="header-stuff">
      <nav className="stuff-navigation">
        <div><NavLink className="stuff-title" to="/stuff/doctors">Doctors</NavLink></div>
        <div><NavLink className="stuff-title" to="/stuff/assitance">Assistance</NavLink></div>
        <div><NavLink className="stuff-title" to="/stuff/receptionist">Receptionist</NavLink></div>
      </nav>
      { context.getUserType() === 'admin' &&
      <div className="add-btn-block">
        <button disabled={!typeUserString} onClick={openModal}>Add new</button>
      </div>
      }
      { props.modaltoggle && <AddUser closeModal={closeModal} type="Add new" userData={{ option: false }}/>}
    </div>
  )
}

export { HeaderStuff }
