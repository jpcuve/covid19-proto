import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const OtherSymptomaticCard: React.FC<CardProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>Is there another symptomatic person?</div>
    </CardTemplate>
  )
}

export default OtherSymptomaticCard