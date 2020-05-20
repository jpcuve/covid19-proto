import React from 'react'
import { CardProps } from '../cards'

const CardTemplate: React.FC<CardProps> = props => {
  const {onMove, children} = props
  return (
    <div>
      <div>
        <span>Card:</span>
        <button onClick={() => onMove(-1)}>Previous</button>
        <button onClick={() => onMove(+1)}>Next</button>
      </div>
      <div>
        {children}
      </div>
      <div>
        <span>Card:</span>
        <button onClick={() => onMove(+1)}>OK</button>
      </div>
    </div>
  )
}

export default CardTemplate