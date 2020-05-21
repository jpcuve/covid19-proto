import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const SymptomCard: React.FC<CardProps> = props => {
  const {answer, onAnswer}  = props
  const [errors, setErrors] = React.useState<string[]>(['Please fill the form'])
  const validate = (data: any) => {
    const messages = []
    if (!data.test){
      messages.push('Please choose a test status')
    }
    setErrors(messages)
    onAnswer(data)
  }

  return (
    <CardTemplate {...props} errors={errors}>
      <form>
        <fieldset>
          <div>Select symptoms</div>
          <div>Select severity</div>
          <div>Select evolution</div>
          <label>
            <span>Tested</span>
            <br/>
            <select value={answer.test} onChange={e => validate({...answer, test: e.currentTarget.value})}>
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