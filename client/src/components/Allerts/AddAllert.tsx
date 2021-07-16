import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { allertsData, setActive } from '../../projectdata/colors'
import { checkRequiredAndLength } from '../../projectdata/SideMethods'
import { EventChange } from '../../projectdata/types'
import { ADD_ALLERT, UPDATE_ALLERT } from '../../query/allerts'
import '../components.css'
import { AddAllertProps } from './allertsInterface'

const AddAllert: React.FC<AddAllertProps> = (props) => {
  const [, setToggle] = useState(false)
  const [title, setTitle] = useState('')
  const [newAllert] = useMutation(ADD_ALLERT)
  const [updateAllert] = useMutation(UPDATE_ALLERT)
  const closeHandler = () => props.closeModal()
  const setActiveColor = (id: number) => {
    setActive(id)
    setToggle(state => !state)
  }

  useEffect(() => {
    setTitle(props.title!)
  }, [props.title])

  const colors = allertsData
  const mappedColors = colors
  .map(el => 
  <div
    key={el.id}
    onClick={() => setActiveColor(el.id)}
    style={{backgroundColor: el.color}}
    className={
    el.isActive
      ? 'allert-circle active-allert-circle' 
      : 'allert-circle'
    }></div>
  )

  const changeHandler = (e: EventChange) => {
    const { value } = e.currentTarget
    setTitle(value)
  }

  const submitHandler = () => {
    if(!checkRequiredAndLength(title, 2, 20)){
      return
    }
    const color = colors.find(el => el.isActive === true)!.color
    if (props.type === 'Edit') {
      return updateAllert({
        variables: {
          title,
          color,
          id: props.id
        }
      }).then(res => {
        if (res) {
          props.setForceRender((state: number) => state + 1)
          props.closeModal()
        }
      })
    }
    newAllert({
      variables: {
        title,
        color, 
        isActive: false
      }
    }).then(res => {
      if (res) {
        props.setForceRender((state: number) => state + 1)
        props.closeModal()
      }
    })
  }
  
  
  return (
    <div className="allert-modal-block-container">
      <div className="allert-modal-block">
      <div className="close-block">
        <div className="close-btn" onClick={closeHandler}>
          <span className="material-icons">close</span>
        </div>
      </div>
        <p className="allert-modal-title">{props.type} Allert</p>
        <div className="allert-modal-input-element">
          <label htmlFor="">
            <span className="input-element-title">Name</span>
            <input 
              onChange={changeHandler} 
              value={title} type="text" 
              className="allert-modal-input input-element-modal"
            />
          </label>
        </div>
        <p className="allert-color-title">Color</p>
        <div className="color-block">
          { mappedColors }
        </div>
        <div className="add-btn-block">
          <button
            onClick={submitHandler}
            className="btn-allert-modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export { AddAllert }
