import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const SickCard: React.FC<CardProps> = props => {
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
          <legend>Does somebody have symptoms?</legend>
          <label>
            <span>Yes</span>
            <input type='radio' checked={data.sick === true} onChange={() => validate({...data, sick: true})}/>
          </label>
          <label>
            <span>No</span>
            <input type='radio' checked={data.sick === false} onChange={() => validate({...data, sick: false})}/>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default SickCard