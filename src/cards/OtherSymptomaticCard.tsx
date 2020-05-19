import React from 'react'
import { RouteComponentProps } from 'react-router'
import CardTemplate from '../templates/CardTemplate'

const OtherSymptomaticCard: React.FC<RouteComponentProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>Is there another symptomatic person?</div>
    </CardTemplate>
  )
}

export default OtherSymptomaticCard