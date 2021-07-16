import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../App'
import './components.css'
import dash from './assets/dash.svg'
import allert from './assets/allert.svg'
import connect from './assets/connect.svg'
import sequence from './assets/sequence.svg'
import { RouteComponent } from './RouteComponent'

const NavBar = () => {
  const history = useHistory()
  const context = useContext<any>(Context)
  const signOut = () => {
    context.removeToken()
    context.removeUserType()
    history.push('/')
  }

  const doctorRoutesRender = () => {
    return <>
    </>
  }
  const receptionRoutesRender = () => {
    return <>
      <RouteComponent img={dash} uri="/" title="Dashboard" />
      <RouteComponent img={connect} uri="/stuff" title="Stuff" />
      <RouteComponent img={allert} uri="/allerts" title="Allerts" />
      <RouteComponent img={sequence} uri="/sequence" title="Sequence" />
    </>
  }

  const adminRoutesRender = () => {
    return <>
      <RouteComponent img={dash} uri="/" title="Dashboard" />
      <RouteComponent img={connect}  uri="/stuff" title="Stuff" />
      <RouteComponent img={allert}  uri="/allerts" title="Allerts" />
      <RouteComponent img={sequence}  uri="/sequence" title="Sequence" />
    </>
  }

  const assistantRoutesRender = () => {
    return <>
      <RouteComponent img={dash} uri="/" title="Dashboard" />
      <RouteComponent img={connect} uri="/stuff" title="Stuff" />
      <RouteComponent img={connect} uri="/doctors" title="Doctors" />
    </>
  }

  return (
    <div className="navbar-block">
      <div className="navbar-logo">
        <p className="logo-title">Logo</p>
      </div>
      <div>
      <nav className="navbar">
        <ul className="route-list">
          {
            context.getUserType() === 'doctor'
            ? doctorRoutesRender() 
            : context.getUserType() === 'reception'
            ? receptionRoutesRender()
            : context.getUserType() === 'admin'
            ? adminRoutesRender()
            : assistantRoutesRender()
          }
        </ul>
        <div className="position-sign">
          <span className="material-icons material-icons-sign">logout</span>
          <span onClick={signOut} className="sign-out-title">Sign Out</span>
        </div>
      </nav>
      </div>
    </div>
  )
}

export { NavBar }
