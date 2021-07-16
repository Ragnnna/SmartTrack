export interface DoctorItemProps {
  id: string,
  name: string,
  email: string,
  phone: string,
  room: string,
  allerts: string,
  connected?: boolean,
  deleteDoctor?: Function,
  setModalToggle?: Function,
  idx?: number
}

export interface DoctorProps {
  setModalToggle: Function
}

export interface ReceptionistProps {
  setModalToggle: Function
}

export interface AssistanceProps {
  setModalToggle: Function
}

export interface userData {
  name?: string,
  email?: string,
  phone?: string,
  option: boolean,
  allerts?: string,
  id?: String
}

export interface RouteComponentProps {
  uri: string,
  title: string,
  img: string
}

export interface Doctors {
  data: DoctorItemProps[]
}

export interface HeaderStuffProps {
  modaltoggle: boolean,
  setModalToggle: Function
}

export interface AllertsItemProps {
  color: string,
  title: string,
  idx: number,
  isActive: boolean,
  id: string,
  refetch: Function,
  setForceRender: Function
}

export interface AllertsProps {
  setForceRender: Function
}

export interface AllertItemState {
  color: string,
  id: string,
  isActive: boolean,
  title: string,
  setActive?: Function
}

export interface AllertDoctorItem {
  id: string,
  title: string,
  color: string,
  isActive: boolean,
  room: string,
  dateAdd: string
}

export interface DoctorResponsibilitiesProps{
  setForceMountDoctor: Function
}