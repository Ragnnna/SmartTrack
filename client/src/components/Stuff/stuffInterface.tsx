import { userData } from "../componentsInterfaces";

export interface AssistanceItemProps {
  id: string,
  name: string,
  email: string,
  phone: string,
  setModalToggle: Function,
  deleteAssistante: Function,
  idx: number
}

export interface DeleteUserAcceptProps{
  id: string,
  deleteDoctor: Function,
  setDeleteModal: Function,
  doctorName?: string
}

export interface ReceptionistItemProps {
  id: string,
  name: string,
  email: string,
  phone: string,
  setModalToggle: Function,
  deleteReceptionist: Function,
  idx: number
}

export interface AddUserProps {
  closeModal: Function,
  type: string,
  userData: userData
}

export interface Room {
  id: string,
  title: string,
  doctorName: string
}

export interface AllerItemProps {
  id: number,
  color: string,
  isActive: boolean,
  title: string
  chooseAllert: Function,
  setToggle: Function,
  titleNormalize: Function,
  idx: number
}

export interface AllertsChoosenProps {
  clearHandler: Function,
  addedAllerts: any[],
  chooseToggler: Function
}

export interface ChooseAllertProps {
  colorsData: any[],
  setRooms: Function,
  rooms: Room[],
  setSelectData: Function,
  selectData: string
}

export interface DoctorConnectProps {
  name: string,
  email: string,
  room: string,
  idx: number,
  connected: boolean,
  updateConnectionHandler: Function,
  id: string
}