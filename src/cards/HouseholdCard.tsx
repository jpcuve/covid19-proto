import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const HouseholdCard: React.FC<CardProps> = props => {
  const {card: {answer}, onAnswer} = props
  const [errors, setErrors] = React.useState<string[]>([])
  const validate = (data: any) => {
    const messages = []
    if (!data.country){
      messages.push('Please select a country')
    }
    if (!data.cityCode){
      messages.push('Please fill-in a city code')
    }
    if (data.householdSize <= 0){
      messages.push('Please select a household size')
    }
    setErrors(messages)
  }
  const handleAnswer = (data: any) => {
    validate(data)
    onAnswer(data)
  }
  const [, dispatch] = React.useReducer<any>(() => validate(answer), undefined)
  React.useEffect(() => dispatch(), [dispatch])

  return (
    <CardTemplate {...props} errors={errors}>
      <form>
        <fieldset>
          <legend>Household</legend>
          <label>
            <span>Country</span>
            <br/>
            <select value={answer.country} onChange={e => handleAnswer({...answer, country: e.currentTarget.value})}>
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
            <input value={answer.cityCode} onChange={e => handleAnswer({...answer, cityCode: e.currentTarget.value})}/>
          </label>
          <label>
            <span>Number of people</span>
            <br/>
            <select value={answer.householdSize} onChange={e => handleAnswer({...answer, householdSize: +e.currentTarget.value})}>
              <option value='0'></option>
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