import React from 'react'
import { CardProps } from '.'
import CardTemplate from '../templates/CardTemplate'

const SickCard: React.FC<CardProps> = props => {
  const [data, setData] = React.useState<any>({sick: null})
  const {onData}  = props
  React.useEffect(() => onData(data), [data, onData])
  return (
    <CardTemplate {...props}>
      <form>
        <fieldset>
          <legend>Do you have symptoms?</legend>
          <label>
            <span>Yes</span>
            <input type='radio' checked={data.sick === true} onChange={() => setData({...data, sick: true})}/>
          </label>
          <label>
            <span>No</span>
            <input type='radio' checked={data.sick === false} onChange={() => setData({...data, sick: false})}/>
          </label>
        </fieldset>
      </form>
    </CardTemplate>
  )
}

export default SickCard