import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { DoctorItemProps, ReceptionistProps } from '../../components/componentsInterfaces'
import { DELETE_RECEPTIONIST, GET_RECEPTIONISTS } from '../../query/receptionist'
import { ReceptionistItem } from '../../components/Stuff/ReceptionistItem'

const Receptionist: React.FC<ReceptionistProps> = (props) => {
  const [deletedUser] = useMutation(DELETE_RECEPTIONIST)
  const [receptionsit, setReceptionsit] = useState<ReceptionistProps[] | any>([])
  const { data, loading, refetch } = useQuery(GET_RECEPTIONISTS)

  useEffect((): void => {
    if (!loading) {
      setReceptionsit(() => [...data.receptionists])
    }
  }, [data, loading])

  useEffect(() => {
    refetch()
  }, [props, refetch])

  const deleteReceptionist = (id: string): void => {
    deletedUser({
      variables:{
        id
      }
    }).then(res => 
      setReceptionsit((state: any) => [...state]
      .filter(el => el.id !== id))
    )
  }

  const renderReceptionist = () => {
    
    return receptionsit.map((el: DoctorItemProps, idx: number) => {
      return <ReceptionistItem
        key={el.id}
        id={el.id}
        name={el.name}
        email={el.email}
        phone={el.phone}
        setModalToggle={props.setModalToggle}
        deleteReceptionist={deleteReceptionist}
        idx={idx}
      />
    })
  }

  return (
    <>
      { receptionsit.length ? renderReceptionist() : <div/>}
    </>
  )
}

export { Receptionist }