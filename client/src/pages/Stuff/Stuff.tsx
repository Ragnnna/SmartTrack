import React, { useContext, useState } from 'react'
import '../pages.css'
import { HeaderStuff } from '../../components/Stuff/HeaderStuff'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Doctor } from './Doctor'
import { Receptionist } from './Receptionist'
import { Assistance } from './Assistance'
import { Context } from '../../App'


const Stuff = () => {
  const [modaltoggle, setModalToggle] = useState<boolean>(false)
  const context = useContext<any>(Context)

  return (
    <div className="stuff-page">
      <HeaderStuff modaltoggle={modaltoggle} setModalToggle={setModalToggle}/>
      <div className="contetn-stuff">
        <Switch>
          <Route
            exact
            path="/stuff/doctors"
            render={() => <Doctor key={context.tog}
            setModalToggle={setModalToggle} />}
          />
          <Route
            exact
            path="/stuff/receptionist"
            render={() => <Receptionist key={context.tog}
            setModalToggle={setModalToggle} />}
          />
          <Route
            exact
            path="/stuff/assitance"
            render={() => <Assistance key={context.tog}
            setModalToggle={setModalToggle}/>}
          />
          <Redirect from="/stuff/*" to="/" />
        </Switch>
      </div>
    </div>
  )
}

export { Stuff }
