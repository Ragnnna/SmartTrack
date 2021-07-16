import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../../App'
import { clearAllerts  } from '../../projectdata/colors'
import { CREATE_DOCTOR, GET_DOCTOR_BY_EMAIL, UPDATE_DOCTOR, UPDATE_DOCTOR_BY_EMAIL } from '../../query/doctor'
import { AllertItem } from './AllertItem'
import { ChooseAllert } from './ChooseAllert'
import { AddUserProps, Room } from './stuffInterface'
import { AllertsChoosen } from './AllertsChoosen'
import { CREATE_RECEPTIONIST, UPDATE_RECEPTIONIST } from '../../query/receptionist'
import { CREATE_ASSISTANTE, UPDATE_ASSISTANTE } from '../../query/assistantes'
import { GET_ALLERTS } from '../../query/allerts'
import { SET_ROOM_DOCTOR_NAME, UPDATE_ROOM_DOCTOR_NAME } from '../../query/room'
import { AllertItemState } from '../componentsInterfaces'

const AddUser: React.FC<AddUserProps> = (props) => {
  const [forceMount, setForceMount] = useState<number>(0)
  const [selectData, setSelectData] = useState<string>('')
  const history = useHistory()
  const context = useContext<any>(Context)
  const [allerts, setAllerts] = useState<AllertItemState[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const { data, loading } = useQuery(GET_ALLERTS)
  const [newAssistante] = useMutation(CREATE_ASSISTANTE)
  const [updatedAssistante] = useMutation(UPDATE_ASSISTANTE)
  const [newReceptionist] = useMutation(CREATE_RECEPTIONIST)
  const [updatedReceptionist] = useMutation(UPDATE_RECEPTIONIST)
  const [newDoctor] = useMutation(CREATE_DOCTOR)
  const [updateRoom] = useMutation(UPDATE_ROOM_DOCTOR_NAME)
  const [setOldRooms] = useMutation(SET_ROOM_DOCTOR_NAME)
  const [updatedDoctorAllerts] = useMutation(UPDATE_DOCTOR_BY_EMAIL)
  const [updatedDoctor] = useMutation(UPDATE_DOCTOR)
  const doctorByEmail = useQuery(GET_DOCTOR_BY_EMAIL, { skip: true })
  const [ , setToggle] = useState(false)
  const [toggleChoose, setToggleChoose] = useState(false)
  const { name, email, phone, option, id } = props.userData
  const titleNormalize = (title: string): string => {
    return title.slice(0, 9) + '...'
  }
  const typeUserString = history.location.pathname.split('/')[2]
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    room: "",
    allerts: [{ id: 999, title: 'empty', color: '#FFFFFF', isActive: false, room: '', dateAdd: '' }],
    connected: false
  })

  const clearState = () => {
    setUser({
      name: '',
      email: '',
      phone: '',
      password: '',
      room: "",
      allerts: [],
      connected: false
    })
  }

  useEffect(() => {
    if (!loading) {
      setAllerts(data.allerts)
    }
  }, [data, loading])

  useEffect(() => {
    if (option === true) {
      if(props.userData.allerts === ""){
        return setUser((state: any) => ({ ...state, name: name, email: email, phone: phone, allerts: [] }))
      }
      const userAllerts = JSON.parse(props.userData.allerts!)
      return setUser((state: any) => ({ ...state, name: name, email: email, phone: phone, allerts: userAllerts }))
    }
  }, [email, name, option, phone, props.userData.allerts])

  const setActive = (id: string) => {
    setAllerts(state => {
      return state.map(el => {
        if(el.id === id){
          return { ...el, isActive: true }
        }
        return { ...el, isActive: false }
      })
    })
  }

  const colorsData = allerts
  .map((el: any, idx:number) => 
  <AllertItem
    idx={idx}
    key={el.id}
    id={el.id}
    title={el.title}
    color={el.color}
    isActive={el.isActive}
    chooseAllert={setActive}
    setToggle={setToggle}
    titleNormalize={titleNormalize}
  />)

  const addedAllerts = user.allerts.map((el: any) => {
    return <div key={el.id} className="allert-item-list">
            <div style={{backgroundColor: el.color}} className="color-circle"></div>
            <div className="allert-item-list-title">{titleNormalize(el.title)}</div>
          </div>
  })

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setUser(state => ({...state, [name]: value}))
  }

  const saveElements = () => {
    if(!selectData){
      return
    }
    if(!user.name.length){ 
      setSelectData('1')
      return setForceMount(state => state + 1)
    }
    const element = allerts.find(el => el.isActive === true)
    const newElement = {...element, room: selectData, dateAdd: Date.now()}

    setUser((state: any) => ({...state, allerts: [newElement, ...state.allerts]}))
    updateRoom({
      variables: {
        title: selectData,
        doctorName: user.name
      }
    }).then(res => {
      doctorByEmail.fetchMore({
        variables: {
          email: user.email
        }
      }).then(res => {
        const gotAllerts = JSON.parse(res.data.doctorByEmail.allerts)
        const newAllertsArray = option ? [newElement, ...gotAllerts] : [newElement]
        updatedDoctorAllerts({
          variables: {
            email: user.email,
            allerts: JSON.stringify(newAllertsArray)
          }
        })
        setForceMount(state => state + 1)
        setSelectData('')
      })
    })
  }

  const chooseToggler = () => {
    setToggleChoose(state => !state)
    clearAllerts()
  }


  const closeHandler = (): void  => { 
    clearState()
    props.closeModal()
    context.toggler((state: number) => state + 1)
  }

  const updateUser = (): any => {
    if(typeUserString === 'receptionist'){
      return updatedReceptionist({
        variables: {
          id: id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      }).then(data => {
        if(data){
          context.toggler((state: number) => state + 1)
          closeHandler()
          clearState()
        }
      })
    }
    if(typeUserString === 'assitance'){
      return updatedAssistante({
        variables: {
          id: id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      }).then(data => {
        if(data){
          context.toggler((state: number) => state + 1)
          closeHandler()
          clearState()
        }
      })
    }
    updatedDoctor({
      variables: {
        id: id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        allerts: JSON.stringify(user.allerts),
      }
    }).then(data => {
      if(data){
        closeHandler()
        clearState()
      }
    })
  }
  
  const createUser = (): any => {
    if(typeUserString === 'receptionist'){
      return newReceptionist({
        variables: {
          name: user.name,
          email: user.email,
          password: '12312313t',
          phone: user.phone
        }
      }).then(data => {
        if(data){
          context.toggler((state: number) => state + 1)
          closeHandler()
          clearState()
        }
      })
    }
    if(typeUserString === 'assitance'){
      return newAssistante({
        variables: {
          name: user.name,
          email: user.email,
          password: '12312313t',
          phone: user.phone
        }
      }).then(data => {
        if(data){
          context.toggler((state: number) => state + 1)
          closeHandler()
          clearState()
        }
      })
    }
    newDoctor({
      variables:{
        name: user.name,
        email: user.email,
        password: '12345',
        phone: user.phone,
        allerts: JSON.stringify(user.allerts),
        room: user.room,
        connected: user.connected
      }
    }).then(data => {
      if(data){
        context.toggler((state: number) => state + 1)
        closeHandler()
        clearState()
      }
    })
  } 

  const userType =  typeUserString === 'doctors' ? 'Doctor' 
  : typeUserString === 'receptionist' ? 'Receptionist' 
  :  'Assitance'

  const clearHandler = () => {
    return setOldRooms({
      variables: {
        doctorName: user.name
      }
    }).then(res => {
      if(res){
      updatedDoctorAllerts({
        variables: {
          email: user.email,
          allerts: JSON.stringify([{ id: 999, title: 'empty', color: '#FFFFFF', isActive: false, room: '', dateAdd: '' }])
        }
      }).then(res => {
        if(res){
          setUser(state => (
            {
              ...state,
              allerts:
              [{ id: 999,
              title: 'empty',
              color: '#FFFFFF',
              isActive:
              false,
              room: '',
              dateAdd: ''
            }]}
          ))
        }
      })
    }
    })
  }

  return (
    <div className="modal-add-user-background">
      <div className="modal-add-user-block">
        <div className="close-block">
          <div onClick={closeHandler} className="close-btn">
            <span className="material-icons">close</span>
          </div>
        </div>
        <p className="form-title">{props.type} {userType}</p>
        <form className="add-user-form-block">
          <div className="form-element">
            <label htmlFor="name">
              <span className="form-item input-title">Name</span>
              <input
                onChange={changeHandler}
                value={user.name}
                className="form-item input-text"
                type="text"
                name="name"
                id="name"
              />
            </label>
          </div>
          <div className="form-element">
            <label htmlFor="email">
              <span className="form-item input-title">Email</span>
              <input
                onChange={changeHandler}
                value={user.email}
                className="form-item input-text"
                type="text"
                name="email"
                id="email"
              />
            </label>
          </div>
          <div className="form-element">
            <label htmlFor="phone">
              <span className="form-item input-title">Phone</span>
              <input
                onChange={changeHandler}
                value={user.phone}
                className="form-item input-text"
                type="text"
                name="phone"
                id="phone"
              />
            </label>
          </div>
        </form>
        {typeUserString === 'doctors' &&
        <AllertsChoosen
          clearHandler={clearHandler}
          chooseToggler={chooseToggler}
          addedAllerts={addedAllerts}
        />}
        {toggleChoose && 
          <ChooseAllert
            key={forceMount} 
            colorsData={colorsData}
            rooms={rooms}
            setRooms={setRooms}
            setSelectData={setSelectData}
            selectData={selectData}
          />
        }
        { 
          !toggleChoose && 
          <div className="add-btn-block text-center">
            <button onClick={!option ? createUser : () => updateUser()}>Save</button>
          </div>
        }
        { 
          toggleChoose && 
          <div className="add-btn-block text-center">
            <button onClick={saveElements}>Add</button>
          </div>
        }
      </div>
    </div>
  )
}

export { AddUser }
