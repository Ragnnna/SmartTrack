import React from 'react'
import { normalizeColor } from '../../projectdata/SideMethods'
import '../components.css'
import { AllertItemState } from './dashboardInterfaces'

const DashboardAllertItem: React.FC<AllertItemState> = (props) => {
  const { title, color, isActive, setActive, id } = props
  const titleCircle = title[0].toLocaleUpperCase()
  
  const setActiveHandler = () => {
    if(setActive){
      setActive(id)
    }
  }

  return (
    <div
    onClick={setActiveHandler}
    className={
      isActive
      ? "dashboard-allert-item-block active-allert-item" 
      : "dashboard-allert-item-block"
      }
    >
      <div 
      style={
        { backgroundColor: color,
          borderColor: normalizeColor(color),
          color: normalizeColor(color) 
        }} 
        className="allert-content-item-circle"
      >
        <p className="allert-content-item-circle-title">{ titleCircle }</p>
      </div>
      <div className="dashboard-allert-item-block-title">
        <p>{ title }</p>
      </div>
    </div>
  )
}

export { DashboardAllertItem }
