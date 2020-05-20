import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const SymptomCard: React.FC<CardProps> = props => {
  const {answer: data, onAnswer: onData}  = props
  return (
    <CardTemplate {...props}>
      <form>
        <fieldset>
          <div>Select symptoms</div>
          <div>Select severity</div>
          <div>Select evolution</div>
          <label>
            <span>Tested</span>
            <br/>
            <select value={data.test} onChange={e => onData({...data, test: e.currentTarget.value})}>
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