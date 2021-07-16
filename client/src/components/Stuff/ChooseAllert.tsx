import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { EventSelect } from '../../projectdata/types'
import { GET_ROOMS } from '../../query/room'
import { ChooseAllertProps, Room } from './stuffInterface'

const ChooseAllert: React.FC<ChooseAllertProps> = (props) => {
  const { rooms, setRooms, setSelectData, selectData } = props
  const { data, loading, refetch } = useQuery(GET_ROOMS)
  useEffect(() => {
    if(!loading){
      setRooms(data.rooms.filter((el: Room) => el.doctorName === ''))
    }
  }, [data, loading, setRooms])

  useEffect(() => {
    refetch()
  }, [refetch, props])

  const mappedOptions = () => rooms
  .map(el => 
    <option 
      key={el.id}
      value={el.title}>
        {el.title}
    </option>
  )

  const changeHandler = (e: EventSelect) => {
    setSelectData(e.currentTarget.value)
  }

  return (
    <div className="choose-allert">
      <span className="choose-allert-title">choose the allert</span>
      <select onChange={changeHandler} value={selectData} className="select-rooms">
        <option value={''} disabled>Choose Room</option>
        {props.selectData === '1' && <option value={'1'} disabled>Invalid name</option>}
        {  mappedOptions() }
      </select>
        <div className="choose-allert-items">
          {props.colorsData}
      </div>
    </div>
  )
}

export { ChooseAllert }
