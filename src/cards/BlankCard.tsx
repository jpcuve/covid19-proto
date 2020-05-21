import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const BlankCard: React.FC<CardProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>Blank card with some information</div>
    </CardTemplate>
  )
}

export default BlankCard