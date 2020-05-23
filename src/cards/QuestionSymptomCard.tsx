import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const QuestionSymptomCard: React.FC<CardProps> = props => {
  const {card: {answer}, onAnswer}  = props
  const [errors, setErrors] = React.useState<string[]>(['Please fill the form'])
  const validate = (data: any) => {
    setErrors([])
    onAnswer(data)
  }

  return (
    <CardTemplate {...props} errors={errors}>
      <form>
        <fieldset>
          <legend>Is anybody symptomatic?</legend>
          <label>
            <span>Yes</span>
            <input type='radio' checked={answer.response === true} onChange={() => validate({...answer, response: true})}/>
          </label>
          <label>
            <span>No</span>
            <input type='radio' checked={answer.response === false} onChange={() => validate({...answer, response: false})}/>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default QuestionSymptomCard