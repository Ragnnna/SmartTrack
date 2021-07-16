import { useQuery } from '@apollo/client'
import React, { useEffect, useState }  from 'react'
import { AddAllert } from '../components/Allerts/AddAllert'
import { AllertComponent } from '../components/Allerts/AllertComponent'
import { AllertsItemProps, AllertsProps } from '../components/componentsInterfaces'
import { GET_ALLERTS } from '../query/allerts'
import './pages.css'

const Allerts: React.FC<AllertsProps> = (props) => {
  const [ toggleModal, setToggleModal ] = useState(false)
  const { data, loading, refetch } = useQuery(GET_ALLERTS)
  const [allerts, setAllerts] = useState([])
  useEffect(() => {
    if(!loading){
      setAllerts(data.allerts)
    }
  }, [data, loading])

  useEffect(() => {
    refetch()
  }, [props, refetch])

  const showModal = (): void => setToggleModal(true)
  const closeModal = (): void => setToggleModal(false)
  
  const renderAllerts = () => {
    return allerts
    .map((el: AllertsItemProps, idx) => 
    <AllertComponent
      key={el.id}
      color={el.color}
      idx={idx + 1}
      title={el.title}
      isActive={el.isActive}
      id={el.id}
      refetch={refetch}
      setForceRender={props.setForceRender}
    />)
  }


  return (
    <div className="allerts-page">
      <div className="header-allerts">
        <div className="block-header-allerts"></div>
        <div className="add-btn-block">
          <button onClick={showModal}>Add new</button>
        </div>
    	</div>
      <div className="allerts-container">
        { allerts.length && renderAllerts() }
      </div>
      { toggleModal 
      && 
      <AddAllert
        closeModal={closeModal}
        refetch={refetch}
        setForceRender={props.setForceRender}
        type="Add"
        colors={allerts}
      />}
  </div>
  )
}

export { Allerts }
