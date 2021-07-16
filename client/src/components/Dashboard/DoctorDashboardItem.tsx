import moment from 'moment'
import React, { useState } from 'react'
import { normalizeColor } from '../../projectdata/SideMethods'
import { DoctorDashboardItemProps } from './dashboardInterfaces'
import { DashboardModal } from './DashboardModal'

const DoctorDashboardItem: React.FC<DoctorDashboardItemProps> = (props) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const { title, room, dateAdd, color, email, allertID } = props
  const titleAllert = title[0].toLocaleUpperCase()
  const timeAdd = moment(dateAdd).format("hh:mm")

  return (
    <div className="doctor-dashboard-item-container">
    <div className="doctor-dashboard-item">
      <div className="doctor-dashboard-item-header">
        <div className="item-header-room-title">
          <p>{ room === "" ? "No" : room}</p>
        </div>
        <div className="item-header-date-add">
          <p className="item-header-date-add-title">{dateAdd === "" ? "00:00" : timeAdd}</p>
        </div>
      </div>
        <div className="item-content-allert-block">
          <div
            style={
              {
                borderColor: normalizeColor(color), 
                backgroundColor: color, 
                color: normalizeColor(color) 
              }
            }
            className="item-content-item-circle">
            <p className="item-content-item-circle-title">{ titleAllert }</p>
          </div>
          <p className="btn-item-content-allert">{ title }
            <span 
              onClick={() => setToggleModal(true)}
              className="material-icons item-content-allert-icon">
                arrow_drop_down 
            </span>
          </p>
        </div>
      </div>
      { toggleModal && 
        <DashboardModal
          email={email}
          updateAllert={props.updateAllert}
          allertID={allertID}
          setToggleModal={setToggleModal}
        /> 
      }
    </div> 
  )
}

export { DoctorDashboardItem }
