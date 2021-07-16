import { Room } from "../Stuff/stuffInterface";

export interface DeleteRoomAcceptProps{
  id: string,
  setToggleModalDelete: Function,
  deleteHandler: Function,
  title: string
}

export interface SequenceAllertProps {
  setSequenceModal: Function
}

export interface RoomProps {
  title: string,
  doctorName: string,
  prov?: any,
  backToDrag: Function,
  id: string,
  innerRef?: any,
  dragHandleProps?: any,
  draggableProps?: any,
  type?: string,
  showModalDelete?: Function,
  deleteHandler?: Function,
  setMountForce?: Function,
  setAddedRooms?: Function
}

export interface DragAreaProps  {
  setMountForce: Function,
  setRoomList: Function,
  setAddedRooms: Function,
  addedRooms: Room[]
}

export interface AddRoomProps {
  closeModal: Function,
  type: string,
  id?: string,
  titleRoom?: string,
  setMountForce?: Function,
}