import React from 'react'
import { CardProps } from '../cards'

interface CardTemplateProps extends CardProps {
  errors: string[],
}

const CardTemplate: React.FC<CardTemplateProps> = props => {
  const {onMove, children, errors} = props
  return (
    <div>
      <div>
        <span>Card:</span>
        <button onClick={() => onMove(-1)}>Previous</button>
        <button onClick={() => onMove(+1)} disabled={errors.length > 0}>Next</button>
      </div>
      <div>
        <ul>
          {errors.map((error, i) => <li key={i.toString()}>{error}</li>)}
        </ul>
      </div>
      <div>
        {children}
      </div>
      <div>
        <span>Card:</span>
        <button onClick={() => onMove(+1)} disabled={errors.length > 0}>OK</button>
      </div>
    </div>
  )
}

export default CardTemplate