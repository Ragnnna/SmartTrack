import React, { useEffect, useState } from 'react'
import '../components.css'
import { DragDropContext, Draggable, Droppable }from 'react-beautiful-dnd'
import { Room } from './Room'
import { AddRoom } from './AddRoom'
import { useQuery } from '@apollo/client'
import { GET_ROOMS } from '../../query/room'
import { DragAreaProps } from './roomInterface'

const DragArea: React.FC<DragAreaProps> = (props) => {
  const [onBoard, setOnBoard] = useState(false)
  const [rooms, setRooms] = useState<any>([])
  const [toggleModal, setToggleModal] = useState(false)
  const openModal = () => setToggleModal(true)
  const closeModal = () => setToggleModal(false)
  const { data, loading, refetch } = useQuery(GET_ROOMS)

  useEffect(() => {
    if(!loading){
      setRooms(data.rooms)
    }
  }, [loading, data])

  useEffect(() => {
    refetch()
  }, [props, refetch])

  const handleDragEnd = (result: any) => {
    if (!onBoard) {
      return
    }
    props.setRoomList((state: string[]) => {
      const newElement = rooms.find((el: any) => el.id === result.draggableId)
      if(newElement.doctorName.length > 0){
        return state
      }
      return [...state, newElement.title]
    })
    props.setAddedRooms((state: any) => {
      const newElement = rooms.find((el: any) => el.id === result.draggableId)
      if(newElement.doctorName.length > 0){
        return [...state]
      }
      return [ newElement, ...state ]
    })
    setRooms((state: any) => {
      const Element = state.find((el: any) => el.id === result.draggableId)
      if(Element.doctorName.length > 0){
        return state
      }
      const newRoomsState = state.filter((el: any) => el.id !== result.draggableId)
      return newRoomsState
    })
  }

  const checkItemDrag = (e: any) => {
    if(e.destination){
      return setOnBoard(true)
    }
    return setOnBoard(false)
  }

  const backToDrag = (id: string) => {
    setRooms((state: any) => {
      const newElement = props.addedRooms.find((el: any) => el.id === id)
      return [newElement, ...state]
    })
    props.setAddedRooms((state: any) => {
      const newAddedRooms = props.addedRooms.filter((el: any) => el.id !== id)
      return newAddedRooms
    })
  }

  return (
    <DragDropContext onDragEnd={(res) => handleDragEnd(res)} onDragUpdate={(e) => checkItemDrag(e)}>
      <Droppable droppableId="ITEMS">
        {(provided, snapshot) => (
          <div className="drop-area" ref={provided.innerRef}>
            { props.addedRooms.length === 0 && <p className="drop-area-title">Drag and Drop rooms to the box</p>}
            {
              props.addedRooms.map((el: any) => (
                <Room
                title={el.title}
                doctorName={el.doctorName}
                backToDrag={backToDrag}
                id={el.id}
                setMountForce={props.setMountForce}
                setAddedRooms={props.setAddedRooms}
                />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <p className="drag-area-title">Drag and Drop rooms to the box</p>
      <Droppable droppableId="BAG" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div className="drag-area" ref={provided.innerRef}>
            <div className="add-room">
              <div className="add-info">
                <div onClick={openModal} className="add-title"><p>+</p></div>
                <p className="doctor-room add-room-name">Add Room</p>
              </div>
            </div>
            { rooms.length > 0 &&
              rooms.map((el: any, idx: number) => (
                <Draggable key={el.id} draggableId={el.id} data={el.title} index={idx}>
                  {(provided, snapshot) => (
                    <Room
                      innerRef={provided.innerRef}
                      dragHandleProps={provided.dragHandleProps}
                      draggableProps={provided.draggableProps}
                      title={el.title}
                      id={el.id}
                      doctorName={el.doctorName}
                      type="FromDrag"
                      backToDrag={() => {}}
                      setMountForce={props.setMountForce}
                    />
                  )}
                </Draggable>
              ))
            }
            {provided.placeholder}
          </div>
        )}
        </Droppable>
        { toggleModal && 
        <AddRoom
          type="Add new"
          closeModal={closeModal}
          setMountForce={props.setMountForce}
        /> }
    </DragDropContext>
  )
}

export { DragArea }