import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const QuestionOtherCard: React.FC<CardProps> = props => {
  const {card: {answer, extra}, onAnswer}  = props
  const [errors, setErrors] = React.useState<string[]>([])
  const validate = (data: any) => {
    setErrors([])
  }
  const handleAnswer = (data: any) => {
    validate(data)
    onAnswer(data)
  }
  const [, dispatch] = React.useReducer<any>(() => validate(answer), undefined)
  React.useEffect(() => dispatch(), [dispatch])

  return (
    <CardTemplate {...props} errors={errors}>
      {extra.survey.people.map((person: any) => { return (
        <div key={person.identity.initials}>
          <span>{person.identity.initials}</span>
          {person.symptom.symptoms && <span>(Symptoms today)</span>}
          {!person.symptom.symptoms && <span>(No symptom)</span>}
        </div>
      )})}
      <form>
        <fieldset>
          <legend>Is there another symptomatic person?</legend>
          <label>
            <span>Yes</span>
            <input type='radio' checked={answer.response === true} onChange={() => handleAnswer({...answer, response: true})}/>
          </label>
          <label>
            <span>No</span>
            <input type='radio' checked={answer.response === false} onChange={() => handleAnswer({...answer, response: false})}/>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default QuestionOtherCard