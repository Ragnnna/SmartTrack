import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { DoctorItemProps } from '../components/componentsInterfaces'
import { DashBoardProps } from '../components/Dashboard/dashboardInterfaces'
import { DoctorDashboard } from '../components/Dashboard/DoctorDashboard'
import { GET_DOCTORS, UPDATE_DOCTOR_BY_EMAIL } from '../query/doctor'

export const DashBoardContext = React.createContext({})

const Dashboard: React.FC<DashBoardProps> = (props) => {
  const [doctors, setDoctors] = useState<DoctorItemProps[]>([])
  const { data, loading, refetch } = useQuery(GET_DOCTORS)
  const [updatedAllerts] = useMutation(UPDATE_DOCTOR_BY_EMAIL)

  useEffect(() => {
    if(!loading){
      setDoctors(data.doctors)
    }
  }, [data, loading])

  useEffect(() => {
    refetch()
  }, [props, refetch])

  const updateAllert = (email: string, allertID: string, allert: any) => {
    const doctorAllerts = JSON
      .parse(doctors
      .find(el => el.email === email)?.allerts!)
    const newAllerts = doctorAllerts.map((el: any) => {
      if(el.id === allertID){
        return {
          ...el,
          color:
          allert.color,
          title: allert.title,
          dateAdd: Date.now()
        }
      }
      return el
    })
    updatedAllerts({
      variables: {
        email,
        allerts: JSON.stringify(newAllerts)
      }
    }).then(res => {
      if(res){
        props.setForceMount((state: number) => state + 1)
      }
    })
  }

  const resetAllerts = (email: string) => {
    const newAllerts = JSON.stringify([{
      id: 999, title:
      'empty', color:
      '#FFFFFF',
      isActive: false,
      room: '',
      dateAdd: '' 
    }])
    
    updatedAllerts({
      variables: {
        email,
        allerts: newAllerts
      }
    }).then(res => {
      if(res){
        props.setForceMount((state: number) => state + 1)
      }
    })
  }

  const mappedDoctorDashboards = doctors
  .map(el => {
    return <DoctorDashboard
      key={el.id}
      updateAllert={updateAllert}
      doctorData={el}
      resetAllerts={resetAllerts}
    />
  })

  return (
    <DashBoardContext.Provider
      value={{
        setForceMount: props.setForceMount
      }}>
      <div className="dashboard-page">
        { doctors.length && mappedDoctorDashboards }
      </div>
    </DashBoardContext.Provider>
  )
}

export { Dashboard }