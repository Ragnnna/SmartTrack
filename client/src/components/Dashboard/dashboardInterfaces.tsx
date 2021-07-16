import { DoctorItemProps } from "../componentsInterfaces";

export interface DashboradModalProps {
  setToggleModal: Function,
  email: string,
  allertID: string,
  updateAllert: Function
}
  
export interface DashBoardProps {
  setForceMount: Function
}
  
export interface AllertItemState {
  color: string,
  id: string,
  isActive: boolean,
  title: string,
  setActive?: Function
}

export interface DoctorDashboardItemProps {
  title: string,
  color: string,
  room: string,
  dateAdd: string,
  email: string,
  allertID: string,
  updateAllert: Function,
}

export interface AllertDoctorItem {
  id: string,
  title: string,
  color: string,
  isActive: boolean,
  room: string,
  dateAdd: string
}

export interface DoctorDashboardProps {
  doctorData: DoctorItemProps,
  resetAllerts: Function,
  updateAllert: Function
}