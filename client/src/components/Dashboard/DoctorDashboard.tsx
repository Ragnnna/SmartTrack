import React, { useState } from 'react'
import '../components.css'
import { AllertDoctorItem, DoctorDashboardProps } from './dashboardInterfaces'
import { DoctorDashboardItem } from './DoctorDashboardItem'

const DoctorDashboard: React.FC<DoctorDashboardProps> = (props) => {
  const [sliceNumber, setSliceNumber] = useState<number>(9)
  const [slicedNumber, setSlicedNumber] = useState<number>(100)
  const { name, allerts, email } = props.doctorData
  const newAllerts = allerts === "" 
  ? [] 
  : JSON.parse(allerts) 
  const mappedDoctorDashboradItems = newAllerts
  .filter((el: any) => el.title !== "empty")
  .map((el: AllertDoctorItem) => {
    return <DoctorDashboardItem
      key={el.id}
      updateAllert={props.updateAllert}
      room={el.room} 
      title={el.title}
      color={el.color}
      dateAdd={el.dateAdd}
      email={email}
      allertID={el.id}
    />
  })

  const sliceItemNormalize = (arr: any, to: number) => {
    return arr.slice(0, to)
  }

  const increment = () => setSliceNumber(state => 
    allerts.length === state 
    ? state + 0 
    : state + 1
  )
  const decrement = () => setSliceNumber(state => 
    state <= 0 
    ? state - 0 
    : state - 1
  )

  const setSliceHandler = () => {
    setSlicedNumber(sliceNumber)
  }

  const resetHandler = () => props.resetAllerts(email)

  return (
    <div className="doctor-dashboard">
      <div className="doctor-dashboard-interface">
        <div className="doctor-dashboard-interface-header">
          <button onClick={resetHandler} className="interface-btn-reset">Reset</button>
        </div>
        <div className="doctor-dashboard-interface-content">
          <p className="dashboard-content-name">{ name }</p>
          <p className="dashboard-content-status">doctor</p>
        </div>
        <div className="doctor-dashboard-interface-footer">
          <span
            onClick={decrement}
            className="footer-interface-item count-event"
          >
            -
          </span>
          <span className="footer-interface-item counter-value">{ sliceNumber }</span>
          <span
            onClick={increment}
            className="footer-interface-item count-event"
          >
            +
          </span>
          <span className="interface-in-line">in line</span>
          <button
            onClick={setSliceHandler}
            className="interface-stop-in-line"
          >
            Stop to the line
          </button>
        </div>
      </div>
      {sliceItemNormalize(mappedDoctorDashboradItems, slicedNumber)}
    </div>
  )
}

export { DoctorDashboard }
