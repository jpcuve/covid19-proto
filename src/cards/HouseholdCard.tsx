import React from 'react'
import { RouteComponentProps } from 'react-router'
import CardTemplate from '../templates/CardTemplate'

const HouseholdCard: React.FC<RouteComponentProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>How many people in your household?</div>
    </CardTemplate>
  )
}

export default HouseholdCard