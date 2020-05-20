import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const HouseholdCard: React.FC<CardProps> = props => {
  const {answer: data, onAnswer: onData}  = props
  return (
    <CardTemplate {...props}>
      <form>
        <fieldset>
          <legend>Household</legend>
          <label>
            <span>Country</span>
            <br/>
            <select value={data.country} onChange={e => onData({...data, country: e.currentTarget.value})}>
              <option value=''></option>
              <option value='europe'>Europe</option>
              <option value='america'>America</option>
              <option value='africa'>Africa</option>
              <option value='asia'>Asia</option>
              <option value='oceania'>Oceania</option>
            </select>
          </label>
          <label>
            <span>City code</span>
            <br/>
            <input value={data.cityCode} onChange={e => onData({...data, cityCode: e.currentTarget.value})}/>
          </label>
          <label>
            <span>Number of people</span>
            <br/>
            <select value={data.householdSize} onChange={e => onData({...data, householdSize: +e.currentTarget.value})}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
            </select>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default HouseholdCard