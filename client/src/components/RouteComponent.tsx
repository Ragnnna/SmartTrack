import React from 'react'
import { NavLink } from 'react-router-dom'
import { RouteComponentProps } from './componentsInterfaces'
import './components.css'

const RouteComponent: React.FC<RouteComponentProps> = (props) => {
  const { uri, title, img } = props

  return(
    <>
      
      <NavLink
        exact
        activeClassName="active-link"
        className="link" 
        to={uri}
      >
        <img
          src={img}
          alt=""
          className="img-icon-route"
        />
        { title }
      </NavLink>
    </>
  )
}

export { RouteComponent }
