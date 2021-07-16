import React from 'react'
import './views.css'
import { Switch, Route } from 'react-router-dom'
import { Register } from '../pages/Auth/Register'
import { Login } from '../pages/Auth/Login'

const Auth = () => {

  return (
    <div className="auth-view">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
    </div>
  )
}

export { Auth }