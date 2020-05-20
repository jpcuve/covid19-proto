import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const IdentityCard: React.FC<CardProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>Enter intials</div>
      <div>Select age range</div>
      <div>Select gender</div>
      <div>Yes/No factors</div>
      <div>Select symptoms</div>
      <div>Select severity</div>
      <div>Select evolution</div>
      <div>Select tested</div>
    </CardTemplate>
  )
}

export default IdentityCard