import React from 'react'
import '../components.css'
import { SequenceAllertProps } from './roomInterface'

const SequenceAllert: React.FC<SequenceAllertProps> = (props) => {

  return (
    <div className="sequence-background">
      <div className="sequence-block">
      <div className="close-block">
        <div className="close-btn">
        <span
          onClick={() => props.setSequenceModal(false)}
          className="material-icons"
        >
          close
        </span>
      </div>
        </div>
        <p className="sequence-title">Sequence is created.</p>
      </div>
    </div>
  )
}

export {SequenceAllert}
