import React, { useState } from 'react'
import { AddAllert } from './AddAllert'
import '../components.css'
import { AllertsItemProps } from '../componentsInterfaces'

const AllertComponent: React.FC<AllertsItemProps> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const { idx, color, title, id, refetch, setForceRender } = props
  const showModal = () => setToggle(() => true)
  const closeModal = () => setToggle(() => false)
  
  return (
    <div className="allerts-component">
      <div className="allerts-component-number el">{ idx }</div>
      <div className="allerts-component-title el">{ title }</div>
      <div className="allerts-component-empty-block el"></div>
      <div style={{ backgroundColor: color }} className="allerts-component-color el"></div>
      <div onClick={() => showModal()} className="allerts-component-edit">
      <span className="material-icons">
        mode_edit
      </span>
      </div>
      {toggle && <AddAllert 
      closeModal={closeModal} 
      refetch={refetch}
      setForceRender={setForceRender}
      type="Edit"
      id={id}
      title={title}
      /> }
    </div>
  )
}

export { AllertComponent }
