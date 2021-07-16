import React from 'react'
import '../components.css'
import { AllertsChoosenProps } from './stuffInterface'

const AllertsChoosen: React.FC<AllertsChoosenProps> = (props) => {
  const clear = () => props.clearHandler()
  const choose = () => props.chooseToggler()

  return(
    <>
    <div className="allerts-chosened">
          <p><span className="allerts-chosened-title">Allerts </span>
            <button onClick={clear} className="clear-btn">
              x
            </button>
          </p>
          <div className="allerts-list">
            {props.addedAllerts}
          </div>
          <hr />
        </div>
      <div className="show-choosen">
        <div className="allert-item-add">
          <div onClick={choose} className="color-circle-add">
            <span className="add-icon">+</span>
          </div>
          <div className="allert-item-text">
            <p>Add on Allert</p>
          </div>
        </div>
      </div>
    </>
  )
}

export { AllertsChoosen }
