import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'


const FinalCard: React.FC<CardProps> = props => {
  const {answer} = props
  return (
    <CardTemplate {...props} errors={[]}>
      <div><pre>{JSON.stringify(answer.survey, null, 2)}</pre></div>
      <div>Captcha</div>
    </CardTemplate>
  )
}

export default FinalCard