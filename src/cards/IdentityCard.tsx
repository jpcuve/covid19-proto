import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const IdentityCard: React.FC<CardProps> = props => {
  const {card: {answer}, onAnswer}  = props
  const [errors, setErrors] = React.useState<string[]>([])
  const validate = (data: any) => {
    const messages = []
    if (!data.initials){
      messages.push('Please fill-in initials')
    }
    if (!data.ageRange){
      messages.push('Please choose an age range')
    }
    if (!data.gender){
      messages.push('Please choose a gender')
    }
    if (!data.preExisting){
      messages.push('Please specify if you have a pre-existing condition')
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
          <legend>Identity</legend>
          <label>
            <span>Initials</span>
            <br/>
            <input value={answer.initials} onChange={e => handleAnswer({...answer, initials: e.currentTarget.value})}/>
          </label>
          <label>
            <span>Age range</span>
            <br/>
            <select value={answer.ageRange} onChange={e => handleAnswer({...answer, ageRange: e.currentTarget.value})}>
              <option value=''></option>
              <option value='<50'>Under 50</option>
              <option value='50<=60'>Between 50 and 60</option>
              <option value='>60'>Over 60</option>
            </select>
          </label>
          <label>
            <span>Gender</span>
            <br/>
            <select value={answer.gender} onChange={e => handleAnswer({...answer, gender: e.currentTarget.value})}>
              <option value=''></option>
              <option value='M'>Male</option>
              <option value='F'>Female</option>
              <option value='X'>Other</option>
            </select>
          </label>
          <label>
            <span>Pre-existing condition</span>
            <br/>
            <select value={answer.preExisting} onChange={e => handleAnswer({...answer, preExisting: e.currentTarget.value})}>
              <option value=''></option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default IdentityCard