import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const BlankCard: React.FC<CardProps> = props => {
  const {answer} = props
  return (
    <CardTemplate {...props} errors={[]}>
      {answer.title && <h1>{answer.title}</h1>}
      <div>Blank card with some information</div>
    </CardTemplate>
  )
}

export default BlankCard