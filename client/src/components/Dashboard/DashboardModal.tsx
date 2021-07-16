import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_ALLERTS } from '../../query/allerts'
import '../components.css'
import { AllertItemState, DashboradModalProps } from './dashboardInterfaces'
import { DashboardAllertItem } from './DashboardAllertItem'

const DashboardModal: React.FC<DashboradModalProps> = (props) => {
  const [allertItems, setAllertItems] = useState<AllertItemState[]>([])
  const { data, loading } = useQuery(GET_ALLERTS)

  useEffect(() => {
    if(!loading){
      setAllertItems(data.allerts)
    }
  }, [data, loading])

  const setActive = (id: string) => {
    setAllertItems(state => {
      const newState = state.map(el => {
        if (el.id === id) {
          return { ...el, isActive: true }
        }
        return { ...el, isActive: false }
      })
      return newState
    })
  }

  const closeHandler = () => {
    const activeAllert = allertItems.find(el => el.isActive === true)
    props.updateAllert(props.email, props.allertID, activeAllert)
    props.setToggleModal(false)
  }

  const mappedDashboardAllertItem = allertItems
  .slice(0, 5)
  .map(el => {
    return <DashboardAllertItem 
      key={el.id}
      id={el.id} 
      title={el.title} 
      color={el.color} 
      isActive={el.isActive}
      setActive={setActive}
    />
  })

  const mappedDashboardAllertItem2 = allertItems
  .slice(5, allertItems.length)
  .map(el => {
    return <DashboardAllertItem 
      key={el.id}
      id={el.id} 
      title={el.title} 
      color={el.color} 
      isActive={el.isActive}
      setActive={setActive}
    />
  })

  return (
    <div className="dashboard-modal-background">
      <div className="dashboard-modal-block">
        <div className="close-block-modal">
          <div className="close-btn">
            <span
              onClick={closeHandler}
              className="material-icons"
            >
              close
            </span>
          </div>
        </div>
        <div className="dashboard-modal-block-in">
          <div className="dashboard-modal-block-item">
            { allertItems.length && mappedDashboardAllertItem}
          </div>
          <div className="dashboard-modal-block-item">
            { allertItems.length && mappedDashboardAllertItem2}
          </div>
        </div>
      </div>
    </div>
  )
}

export { DashboardModal }
