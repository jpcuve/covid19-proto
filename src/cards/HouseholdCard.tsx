import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const HouseholdCard: React.FC<CardProps> = props => {
  const [data, setData] = React.useState<any>({'householdSize': 1})
  const {onData}  = props
  React.useEffect(() => onData(data), [data, onData])
  return (
    <CardTemplate {...props}>
      <form>
        <fieldset>
          <legend>How many people in your household?</legend>
          <label>
            <span>Number of people</span>
            <select value={data.householdSize} onChange={e => setData({...setData, householdSize: +e.currentTarget.value})}>
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