import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { AssistanceItem } from '../../components/Stuff/AssistanceItem'
import { AssistanceProps } from '../../components/componentsInterfaces'
import { DELETE_ASSISTANTE, GET_ASSISTANTES } from '../../query/assistantes'
import { AssistanceItemProps } from '../../components/Stuff/stuffInterface'

const Assistance: React.FC<AssistanceProps> = (props) => {
  const [assistance, setAssistance] = useState<AssistanceProps[] | any>([])
  const { data, loading, refetch } = useQuery(GET_ASSISTANTES)
  const [deletedAssistante] = useMutation(DELETE_ASSISTANTE)

  useEffect((): void => {
    if (!loading) {
      setAssistance(() => [...data.assistantes])
    }
  }, [data, loading])

  useEffect(() => {
    refetch()
  }, [props, refetch])

  const deleteAssistante = (id: string): void => {
    deletedAssistante({
      variables:{
        id
      }
    }).then(res => 
      setAssistance((state: any) => [...state]
      .filter(el => el.id !== id))
    )
  }

  const renderAssistance= () => {
    
    return assistance.map((el: AssistanceItemProps, idx: number) => {
      return <AssistanceItem
        idx={idx}
        key={el.id}
        id={el.id}
        name={el.name}
        email={el.email}
        phone={el.phone}
        setModalToggle={props.setModalToggle}
        deleteAssistante={deleteAssistante}
      />
    })
  }

  return (
    <>
      { assistance.length ? renderAssistance() : <div/>}
    </>
  )
}

export { Assistance }
