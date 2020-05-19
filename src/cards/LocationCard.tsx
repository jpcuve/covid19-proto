import React from 'react'
import { RouteComponentProps } from 'react-router'
import CardTemplate from '../templates/CardTemplate'

const LocationCard: React.FC<RouteComponentProps> = props => {
  return (
    <CardTemplate {...props}>
      <div>Select country</div>
      <div>Enter city</div>
    </CardTemplate>
  )
}

export default LocationCard