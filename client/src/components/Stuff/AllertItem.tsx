import React from 'react'
import { AllerItemProps } from './stuffInterface'

const AllertItem: React.FC<AllerItemProps> = (props) => {
  const ChooseHandler = (): void => {
    props.chooseAllert(props.id)
    props.setToggle((state: boolean) => !state)
  }

  return (
    <div onClick={ChooseHandler} className={ props.isActive ? "allert-item active-item" : "allert-item"}>
      <div style={{backgroundColor: props.color.toString() }} className="color-circle"></div>
      <div className="allert-item-text">
        <p>{ props.titleNormalize(props.title.toString()) }</p>
      </div>
  </div>
  )
}

export { AllertItem }
