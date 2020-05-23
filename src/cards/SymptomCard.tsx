import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const SymptomCard: React.FC<CardProps> = props => {
  const {card: {answer}, onAnswer}  = props
  const [errors, setErrors] = React.useState<string[]>([])
  const validate = (data: any) => {
    const messages = []
    if (data.symptoms.length === 0){
      messages.push('Please choose at least one symptom')
    }
    if (!data.severe){
      messages.push('Please choose a severity status')
    }
    if (!data.evolution){
      messages.push('Please choose an evolution status')
    }
    if (!data.test){
      messages.push('Please choose a test status')
    }
    setErrors(messages)
  }
  const handleAnswer = (data: any) => {
    validate(data)
    onAnswer(data)
  }
  const handleSymptom = (symptom: string, include: boolean) => {
    const index = answer.symptoms.indexOf(symptom)
    if (index < 0 && include){
      handleAnswer({...answer, symptoms: [...answer.symptoms, symptom]})
    }
    if (index >= 0 && !include){
      const newSymptoms = [...answer.symptoms]
      newSymptoms.splice(index, 1)
      handleAnswer({...answer, symptoms: newSymptoms})
    }

  }
  const [, dispatch] = React.useReducer<any>(() => validate(answer), undefined)
  React.useEffect(() => dispatch(), [dispatch])

  return (
    <CardTemplate {...props} errors={errors}>
      <form>
        <fieldset>
          <label>
            <span>Symptoms</span>
            <br/>
            <input type="checkbox" checked={answer.symptoms.includes['cough']} onChange={e => handleSymptom('cough', e.target.checked)}/>
            <span>Persistent/ severe cough</span>
            <br/>
            <input type="checkbox" checked={answer.symptoms.includes['fever']} onChange={e => handleSymptom('fever', e.target.checked)}/>
            <span>Fever, over 38°C</span>
            <br/>
            <input type="checkbox" checked={answer.symptoms.includes['breath']} onChange={e => handleSymptom('breath', e.target.checked)}/>
            <span>Shortness of breath</span>
          </label>
          <label>
            <span>Severe?</span>
            <br/>
            <select value={answer.severe} onChange={e => handleAnswer({...answer, severe: e.currentTarget.value})}>
              <option value=''></option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </label>
          <label>
            <span>Evolution since yesterday</span>
            <br/>
            <select value={answer.evolution} onChange={e => handleAnswer({...answer, evolution: e.currentTarget.value})}>
              <option value=''></option>
              <option value='decreasing'>Decreasing</option>
              <option value='same'>Same</option>
              <option value='increasing'>Increasing</option>
            </select>
          </label>
          <label>
            <span>Tested</span>
            <br/>
            <select value={answer.test} onChange={e => handleAnswer({...answer, test: e.currentTarget.value})}>
              <option value=''></option>
              <option value='yes+'>Yes with positive results</option>
              <option value='yes-'>Yes with negative results</option>
              <option value='no'>No</option>
            </select>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default SymptomCard