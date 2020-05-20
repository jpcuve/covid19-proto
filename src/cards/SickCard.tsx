import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const SickCard: React.FC<CardProps> = props => {
  const {answer: data, onAnswer: onData}  = props
  return (
    <CardTemplate {...props}>
      <form>
        <fieldset>
          <legend>Does somebody have symptoms?</legend>
          <label>
            <span>Yes</span>
            <input type='radio' checked={data.sick === true} onChange={() => onData({...data, sick: true})}/>
          </label>
          <label>
            <span>No</span>
            <input type='radio' checked={data.sick === false} onChange={() => onData({...data, sick: false})}/>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default SickCard