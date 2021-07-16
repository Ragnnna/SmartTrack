import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../../App'
import { checkEmail, checkRequiredAndLength } from '../../projectdata/SideMethods'
import { EventButton, EventChange } from '../../projectdata/types'
import { CREATE_ADMIN } from '../../query/admin'
import { CREATE_ASSISTANTE } from '../../query/assistantes'
import { CREATE_DOCTOR } from '../../query/doctor'
import { CREATE_RECEPTIONIST } from '../../query/receptionist'
import '../pages.css'

const Register = () => {
  const [errorForm, setErrorForm] = useState('')
  const history = useHistory()
  const context = useContext<any>(Context)
  const [newDoctor] = useMutation(CREATE_DOCTOR)
  const [newAssistante] = useMutation(CREATE_ASSISTANTE)
  const [newReceptionist] = useMutation(CREATE_RECEPTIONIST)
  const [newAdmin] = useMutation(CREATE_ADMIN)
  const [userType, setUserType] = useState('admin')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    room: '',
    allerts: [{ id: 999, title: 'empty', color: '#FFFFFF', isActive: false, room: '', dateAdd: '' }],
    phone: '',
    connected: false
  })

  const changeHandler = (e: EventChange) => {
    setErrorForm(' ')
    const { value, name, type, id } = e.currentTarget
    if (type === "radio") {
      setUserType(id)
    }
    setUser(state => ({ ...state, [name]: value }))
  }

  const submitHandler = (e: EventButton) => {
    e.preventDefault()
    if (!checkRequiredAndLength(user.name, 2, 12) 
    || !checkEmail(user.email)
    || !checkRequiredAndLength(user.phone, 4, 10)  
    || !checkRequiredAndLength(user.password, 3, 12)) {
      return setErrorForm('Некорректные данные')
    }
    switch(userType){
      case 'doctor':
        newDoctor({
          variables:{
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            room: user.room,
            allerts: JSON.stringify(user.allerts),
            connected: user.connected
          }
        }).then(res => {
          if (res) {
            const id = res.data.addDoctor.id
            context.setToken(id)
            context.setUserType(userType)
            history.push('/')
          }
        })
        break
      case 'reception':
        newReceptionist({
          variables:{
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone
          }
        }).then(res => {
          if (res) {
            const id = res.data.addiReceptionist.id
            context.setToken(id)
            context.setUserType(userType)
            history.push('/')
          }
        })
        break
      case 'assistante':
          newAssistante({
            variables:{
              name: user.name,
              email: user.email,
              password: user.password,
              phone: user.phone
            }
          }).then(res => {
            if (res) {
              const id = res.data.addAssistante.id
              context.setToken(id)
              context.setUserType(userType)
              history.push('/')
            }
          })
        break;
        case 'admin':
          newAdmin({
            variables:{
              name: user.name,
              email: user.email,
              password: user.password,
              phone: user.phone
            }
          }).then(res => {
            if (res) {
              const id = res.data.addAdmin.id
              context.setToken(id)
              context.setUserType(userType)
              history.push('/')
            }
          })
    }
  }

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="auth-title">
          <p>SignUp</p>
        </div>
        <form className="form">
        <div className="form-control">
            <label htmlFor="input-element-1">
              <span className="form-control-title form-element">name</span>
              <input
                onChange={changeHandler}
                value={user.name}
                type="text"
                className="form-element"
                id="input-element-1"
                name="name"
              />
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="input-element-2">
              <span className="form-control-title form-element">email</span>
              <input
                onChange={changeHandler}
                value={user.email}
                type="text"
                className="form-element"
                id="input-element-2"
                name="email"
              />
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="input-element-3">
              <span className="form-control-title form-element">phone</span>
              <input
                onChange={changeHandler}
                value={user.phone}
                type="text"
                className="form-element"
                id="input-element-3"
                name="phone"
              />
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="input-element-4">
              <span className="form-control-title form-element">password</span>
              <input
                onChange={changeHandler}
                value={user.password}
                type="password"
                className="form-element"
                id="input-element-4"
                name="password"
              />
            </label>
          </div>
          <div className="form-control-radios">
            <div className="radio-position">
              <label>
                <input
                  checked={userType === 'admin' && true}
                  onChange={changeHandler}
                  value={userType}
                  type="radio"
                  name="usertype"
                  id="admin"
                />
                <span className="radio-title">Admin</span>
              </label>
            </div>
            <div className="radio-position">
              <label>
                <input
                  onChange={changeHandler}
                  value={userType}
                  type="radio"
                  name="usertype"
                  id="doctor"
                />
                <span className="radio-title">Doctor</span>
              </label>
            </div>
            <div className="radio-position">
              <label>
                <input
                  onChange={changeHandler}
                  value={userType}
                  type="radio"
                  name="usertype"
                  id="reception"
                />
                <span className="radio-title">Reception</span>
              </label>
            </div>
            <div className="radio-position">
              <label>
                <input
                  onChange={changeHandler}
                  value={userType}
                  type="radio"
                  name="usertype"
                  id="assistante"
                />
                <span className="radio-title">Assistant</span>
              </label>
            </div>
          </div>
          <div className="form-control">
            <div className="btn-position">
              <button onClick={submitHandler} className="btn-submit" type="submit">SignIn</button>
            </div>
          </div>
          <div className="error-form">
            <p>{ errorForm }</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export { Register }
