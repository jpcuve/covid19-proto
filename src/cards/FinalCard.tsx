import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'


const FinalCard: React.FC<CardProps> = props => {
  const {card: {extra}} = props
  return (
    <CardTemplate {...props} errors={[]}>
      <div><pre>{JSON.stringify(extra.survey, null, 2)}</pre></div>
      <div>Captcha</div>
    </CardTemplate>
  )
}

export default FinalCard