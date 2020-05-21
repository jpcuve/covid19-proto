import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const OtherSymptomaticCard: React.FC<CardProps> = props => {
  const {answer: data, onAnswer: onData}  = props
  const [errors, setErrors] = React.useState<string[]>(['Please fill the form'])
  const validate = (data: any) => {
    setErrors([])
    onData(data)
  }

  return (
    <CardTemplate {...props} errors={errors}>
      <form>
        <fieldset>
          <legend>Is there another symptomatic person?</legend>
          <label>
            <span>Yes</span>
            <input type='radio' checked={data.otherSymptomatic === true} onChange={() => validate({...data, otherSymptomatic: true})}/>
          </label>
          <label>
            <span>No</span>
            <input type='radio' checked={data.otherSymptomatic === false} onChange={() => validate({...data, otherSymptomatic: false})}/>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default OtherSymptomaticCard