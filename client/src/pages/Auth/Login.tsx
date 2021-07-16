import { useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../../App'
import { checkEmail, checkRequiredAndLength } from '../../projectdata/SideMethods'
import { EventButton, EventChange } from '../../projectdata/types'
import { GET_ADMIN } from '../../query/admin'
import { GET_ASSISTANTE } from '../../query/assistantes'
import { GET_DOCTOR } from '../../query/doctor'
import { GET_RECEPTIONIST } from '../../query/receptionist'
import '../pages.css'

const Login = () => {
  const context = useContext<any>(Context)
  const history = useHistory()
  const [userType, setUserType] = useState('admin')
  const doctor = useQuery(GET_DOCTOR, {
    skip: true
  })
  const assistante = useQuery(GET_ASSISTANTE, {
    skip: true
  })
  const receptionist = useQuery(GET_RECEPTIONIST, {
    skip: true
  })
  const admin = useQuery(GET_ADMIN, {
    skip: true
  })
  const [errorForm, setErrorForm] = useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    room: '',
    allerts: '',
    phone: ''
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
    if (!checkEmail(user.email)
    || !checkRequiredAndLength(user.password, 3, 12)) {
      return setErrorForm('Некорректные данные')
    }
    switch(userType){
      case 'admin':
        admin.fetchMore({
          variables: {
            email: user.email,
            password: user.password
          }
        }).then(res => {
          if(!res.data.admin){
            return setErrorForm('Неверные данные')
          }
          if(user.password.toLocaleLowerCase() !==  res.data.admin.password){
            return setErrorForm('Неверные данные')
          }
          const id = res.data.admin.id
          context.setToken(id)
          context.setUserType(userType)
          history.push('/')
        })
        break
      case 'doctor':
        doctor.fetchMore({
          variables: {
            email: user.email,
            password: user.password
          }
        }).then(res => {
          if(!res.data.doctor){
            return setErrorForm('Неверные данные')
          }
          if(user.password.toLocaleLowerCase() !==  res.data.doctor.password){
            return setErrorForm('Неверные данные')
          }
          const id = res.data.doctor.id
          context.setToken(id)
          context.setUserType(userType)
          history.push('/')
        })
        break
        case 'reception':
        receptionist.fetchMore({
          variables: {
            email: user.email,
            password: user.password
          }
        }).then(res => {
          if(!res.data.receptionist){
            return setErrorForm('Неверные данные')
          }
          if(user.password.toLocaleLowerCase() !==  res.data.receptionist.password){
            return setErrorForm('Неверные данные')
          }
          const id = res.data.receptionist.id
          context.setToken(id)
          context.setUserType(userType)
          history.push('/')
        })
        break
        case 'assistante':
        assistante.fetchMore({
          variables: {
            email: user.email,
            password: user.password
          }
        }).then(res => {
          if(!res.data.assistant){
            return setErrorForm('Неверные данные')
          }
          if(user.password.toLocaleLowerCase() !==  res.data.assistant.password){
            return setErrorForm('Неверные данные')
          }
          const id = res.data.assistant.id
          context.setToken(id)
          context.setUserType(userType)
          history.push('/')
        })
        break
    }
  }


  return (
    <div className="login-page">
      <div className="login-form">
        <div className="auth-title">
          <p>SignIn</p>
        </div>
        <form className="form">
          <div className="form-control">
            <label htmlFor="input-element-1">
              <span className="form-control-title form-element">email</span>
              <input
                onChange={changeHandler}
                value={user.email}
                type="text"
                className="form-element"
                id="input-element-1"
                name="email"
              />
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="input-element-2">
              <span className="form-control-title form-element">passoword</span>
              <input
                onChange={changeHandler}
                value={user.password}
                type="password"
                className="form-element"
                id="input-element-2"
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

export { Login }