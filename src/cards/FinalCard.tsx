import React from 'react'
import { RouteComponentProps } from 'react-router'
import CardTemplate from '../templates/CardTemplate'

const FinalCard: React.FC<RouteComponentProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>Summary</div>
      <div>Captcha</div>
    </CardTemplate>
  )
}

export default FinalCard