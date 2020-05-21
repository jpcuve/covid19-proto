import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'
import { SurveyOneStart } from '../survey'

interface FinalCardProps extends CardProps {
  survey: SurveyOneStart
}


const FinalCard: React.FC<FinalCardProps> = props => {
  const {survey} = props
  return (
    <CardTemplate {...props} errors={[]}>
      <div><pre>{JSON.stringify(survey.data, null, 2)}</pre></div>
      <div>Captcha</div>
    </CardTemplate>
  )
}

export default FinalCard