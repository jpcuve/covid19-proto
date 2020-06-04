import React from 'react'
import { CardProps } from '.'


const FinalCard: React.FC<CardProps> = props => {
  const {card: {extra}} = props
  return (
    <div>
      <div><pre>{JSON.stringify(extra.survey, null, 2)}</pre></div>
      <div>Captcha</div>
    </div>
  )
}

export default FinalCard