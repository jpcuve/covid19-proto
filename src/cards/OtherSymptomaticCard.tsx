import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const OtherSymptomaticCard: React.FC<CardProps> = props => {
  const {answer: data, onAnswer: onData}  = props
  return (
    <CardTemplate {...props}>
      <form>
        <fieldset>
          <legend>Is there another symptomatic person?</legend>
          <label>
            <span>Yes</span>
            <input type='radio' checked={data.otherSymptomatic === true} onChange={() => onData({...data, otherSymptomatic: true})}/>
          </label>
          <label>
            <span>No</span>
            <input type='radio' checked={data.otherSymptomatic === false} onChange={() => onData({...data, otherSymptomatic: false})}/>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default OtherSymptomaticCard