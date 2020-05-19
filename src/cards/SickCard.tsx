import React from 'react'
import { RouteComponentProps } from 'react-router'
import CardTemplate from '../templates/CardTemplate'

const SickCard: React.FC<RouteComponentProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>Do you have symptoms today?</div>
    </CardTemplate>
  )
}

export default SickCard