import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { DoctorItemProps } from '../../components/componentsInterfaces'
import { DoctorConnect } from '../../components/Stuff/DoctorConnect'
import { GET_DOCTORS, UPDATE_DOCTOR_CONNECTION } from '../../query/doctor'
import '../pages.css'

const Doctors = () => {
  const [doctors, setDoctors] = useState<DoctorItemProps[]>([])
  const { data, loading } = useQuery(GET_DOCTORS)
  const [updateDoctorConnection] = useMutation(UPDATE_DOCTOR_CONNECTION)

  useEffect(() => {
    if(!loading){
      setDoctors(data.doctors)
    }
  }, [data, loading])

  const updateConnectionHandler = (id: string, status: boolean) => {
    updateDoctorConnection({
      variables: {
        id,
        connected: status
      }
    }).then(res => {
      setDoctors((state: DoctorItemProps[]): DoctorItemProps[] => {
        const newDoctors = state.map((el: DoctorItemProps) => {
          if(el.id === id){
            return { ...el, connected: status }
          }
          return el
        })
        return newDoctors
      })
    })
  }

  const mappedDoctors = doctors.map((el, idx) => {
    return <DoctorConnect 
      key={el.id}
      name={el.name}
      email={el.email}
      room={el.room}
      idx={idx + 1}
      connected={el.connected!}
      id={el.id}
      updateConnectionHandler={updateConnectionHandler}
    />
  })

  return (
    <div className="doctors-assistant-page">
      <div className="header-assistant-page">
        <p>Doctors</p>
      </div>
      <div className="doctors-assistant-page-content">
        { doctors.length && mappedDoctors }
      </div>
    </div>
  )
}

export { Doctors }
