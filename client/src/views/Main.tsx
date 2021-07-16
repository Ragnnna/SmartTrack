import React, { useContext, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Stuff } from '../pages/Stuff/Stuff'
import { Dashboard } from '../pages/Dashboard'
import { Allerts } from '../pages/Allerts'
import { Context } from '../App'
import { DoctorResponsibilities } from '../pages/DoctorResponsibilities'
import { Doctors } from '../pages/Stuff/Doctors'
import { Sequence } from '../pages/Sequence'

const Main = () => {
  const context = useContext<any>(Context)
  const userType = context.getUserType()
  const [forceMount, setForceMount] = useState<number>(0)
  const [forceMountDoctor, setForceMountDoctor] = useState<number>(0)
  const [forceRender, setForceRender] = useState(0)
  return (
    <div className="main-view">
      <NavBar />
      <div className="content">
        <div className="nav-bar-block"></div>
        <Switch>
          <Route 
            exact 
            path="/responsibilities" 
            render={
            userType === 'doctor' 
              ? () => <DoctorResponsibilities key={forceMountDoctor} setForceMountDoctor={setForceMountDoctor} /> 
              : () => <Redirect to="/"/>
            }
          />
          <Route 
            exact 
            path="/" 
            render={userType === 'doctor' 
              ? () => <Redirect to="/responsibilities"/>
              : () => <Dashboard key={forceMount} setForceMount={setForceMount}/>
            }
          />
          <Route 
            path="/stuff"
            render={userType === 'doctor' 
              ? () => <Redirect to="/responsibilities"/>
              : () => <Stuff />
            }
          />
          <Route 
            path="/doctors"
            render={userType !== 'assistante' 
              ? () => <Redirect to="/"/>
              : () => <Doctors />
            }
          />
          <Route
            path="/allerts"
            render={userType === 'admin' || userType === 'reception'
              ? () => <Allerts key={forceRender} setForceRender={setForceRender} />
              : () => <Redirect to="/"/>
            }
          />
          <Route 
            path="/doctors" 
            render={userType === 'assistante' 
              ? () => <Doctors />
              : () => <Redirect to="/" />
            }
          />
          <Route 
            path="/sequence" 
            render={userType === 'admin' || userType === 'reception'
              ? () => <Sequence />
              : () => <Redirect to="/" />
            }
          />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  )
}

export { Main }