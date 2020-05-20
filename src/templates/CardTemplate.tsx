import React from 'react'
import { CardProps } from '../cards'

const CardTemplate: React.FC<CardProps> = props => {
  return (
    <div>
      <div>
        <span>Card:</span>
        <button onClick={() => props.onMove(-1)}>Previous</button>
        <button onClick={() => props.onMove(+1)}>Next</button>
      </div>
      <div>
        {props.children}
      </div>
      <div>
        <span>Card:</span>
        <button onClick={() => props.onMove(+1)}>OK</button>
      </div>
    </div>
  )
}

export default CardTemplate