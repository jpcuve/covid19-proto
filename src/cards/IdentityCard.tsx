import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const IdentityCard: React.FC<CardProps> = props => {
  const {answer: data, onAnswer: onData}  = props
  return (
    <CardTemplate {...props}>
      <div>Enter intials</div>
      <div>Select age range</div>
      <form>
        <fieldset>
          <legend>Identity</legend>
          <label>
            <span>Initials</span>
            <br/>
            <input value={data.initials} onChange={e => onData({...data, initials: e.currentTarget.value})}/>
          </label>
          <label>
            <span>Age range</span>
            <br/>
            <select value={data.ageRange} onChange={e => onData({...data, ageRange: e.currentTarget.value})}>
              <option value=''></option>
              <option value='<50'>Under 50</option>
              <option value='50<=60'>Between 50 and 60</option>
              <option value='>60'>Over 60</option>
            </select>
          </label>
          <div>Select gender</div>
          <div>Yes/No factors</div>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default IdentityCard