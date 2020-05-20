import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const FinalCard: React.FC<CardProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>Summary</div>
      <div>Captcha</div>
    </CardTemplate>
  )
}

export default FinalCard