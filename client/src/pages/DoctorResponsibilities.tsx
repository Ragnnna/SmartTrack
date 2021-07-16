import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import { AllertDoctorItem, DoctorResponsibilitiesProps } from '../components/componentsInterfaces'
import { DoctorDashboardItem } from '../components/Dashboard/DoctorDashboardItem'
import { GET_DOCTOR_BY_ID, UPDATE_DOCTOR_BY_EMAIL } from '../query/doctor'
import './pages.css'

const DoctorResponsibilities: React.FC<DoctorResponsibilitiesProps> = (props) => {
  const context = useContext<any>(Context)
  const [email, setEmail] = useState<string>('')
  const [allerts, setAllers] = useState<AllertDoctorItem[]>([])
  const { data, loading, refetch } = useQuery(GET_DOCTOR_BY_ID, {
    variables: {
      id: context.getToken()
    }
  })
  const [updatedAllerts] = useMutation(UPDATE_DOCTOR_BY_EMAIL)

  const updateAllert = (email: string, allertID: string, allert: any) => {
    const newAllerts = allerts.map((el: any) => {
      if(el.id === allertID){
        return { ...el, color: allert.color, title: allert.title, dateAdd: Date.now() }
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
        props.setForceMountDoctor((state: number) => state + 1)
      }
    })
  }

  useEffect(() => {
    if(!loading){
      const newAllerts = data.doctorById.allerts === "" 
      ? [] 
      : JSON.parse(data.doctorById.allerts)
      setEmail(data.doctorById.email)
      setAllers(newAllerts)
    }
  }, [data, loading])

  useEffect(() => {
    refetch()
  }, [refetch, props])

  const mappedDoctorDashboardItem = allerts
  .filter(el => el.title !== 'empty')
  .map((el) => {
    return <DoctorDashboardItem
      key={el.id}
      title={el.title}
      color={el.color}
      room={el.room}
      dateAdd={el.dateAdd}
      allertID={el.id}
      email={email}
      updateAllert={updateAllert}
    />
  })

  return (
    <div className="responsibilities-page">
      <div className="container-responsibilities">
        { allerts.length && mappedDoctorDashboardItem}
      </div>
    </div>
  )
}

export { DoctorResponsibilities }
