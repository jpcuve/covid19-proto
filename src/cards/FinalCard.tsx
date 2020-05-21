import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'
import { Survey } from '../survey'

interface FinalCardProps extends CardProps {
  survey: Survey
}


const FinalCard: React.FC<FinalCardProps> = props => {
  const {survey} = props
  return (
    <CardTemplate {...props}>
      <div><pre>{JSON.stringify(survey.data, null, 2)}</pre></div>
      <div>Captcha</div>
    </CardTemplate>
  )
}

export default FinalCard