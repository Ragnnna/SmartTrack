import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { DELETE_DOCTOR, GET_DOCTORS } from '../../query/doctor'
import { DoctorItemProps, DoctorProps } from '../../components/componentsInterfaces'
import { DoctorItem } from '../../components/Stuff/DoctorItem'
import { DELETE_ROOMS_AFTER_DOCTOR } from '../../query/room'

const Doctor: React.FC<DoctorProps> = (props) => {
  const [deletedUser] = useMutation(DELETE_DOCTOR)
  const [doctors, setDoctors] = useState<DoctorItemProps[] | any>([])
  const { data, loading, refetch } = useQuery(GET_DOCTORS)
  const [deletedRooms] = useMutation(DELETE_ROOMS_AFTER_DOCTOR)
  useEffect((): void => {
    if (data) {
      setDoctors(() => [...data.doctors])
    }
  }, [data, loading])

  useEffect(() => {
    refetch()
  }, [props, refetch])

  const deleteDoctor = (id: string, doctorName: string): any => {
    deletedUser({
      variables:{
        id
      }
    }).then(res => {
      if (res) {
        deletedRooms({
          variables: {
            doctorName
          }
        }).then(res => {
          if (res) {
            setDoctors((state: any) => [...state]
            .filter(el => el.id !== id))
          }
        })
      }
    })
  }
  const renderDoctors = () => {
    return doctors.map((el: DoctorItemProps, idx: number) => {
      return <DoctorItem
        key={el.id}
        id={el.id}
        name={el.name}
        email={el.email}
        phone={el.phone}
        room={el.room}
        allerts={el.allerts}
        deleteDoctor={deleteDoctor}
        setModalToggle={props.setModalToggle}
        idx={idx}
      />
    })
  }

  return (
    <>
      { !loading ? renderDoctors() : <div/>}
    </>
  )
}

export { Doctor }