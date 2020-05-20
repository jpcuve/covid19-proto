import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const SickCard: React.FC<CardProps> = props => {
  const [data, setData] = React.useState<any>({sick: ''})
  React.useEffect(() => props.onData(data), [data])
  return (
    <CardTemplate {...props}>
      <form>
        <fieldset>
          <legend>Do you have symptoms?</legend>
          <label>
            <span>Yes</span>
            <input type='radio' checked={data.sick === 'yes'} onChange={() => setData({...data, sick: 'yes'})}/>
          </label>
          <label>
            <span>No</span>
            <input type='radio' checked={data.sick === 'no'} onChange={() => setData({...data, sick: 'no'})}/>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default SickCard