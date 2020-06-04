import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const RecapCard: React.FC<CardProps> = props => {
  const [errors, setErrors] = React.useState<string[]>([])
  const {card: {extra}} = props
  return (
    <CardTemplate {...props} errors={errors}>
      {extra.survey.people.map((person: any) => { return (
        <div key={person.identity.initials}>
          <span>{person.identity.initials}</span>
          {person.symptom.symptoms && <span>Symptoms today</span>}
          {!person.symptom.symptoms && <span>No symptom</span>}
        </div>
      )})}
      <div><pre>{JSON.stringify(extra.survey, null, 2)}</pre></div>
    </CardTemplate>
  )
}

export default RecapCard