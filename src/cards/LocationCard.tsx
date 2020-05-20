import React from 'react'
import CardTemplate from '../templates/CardTemplate'
import { CardProps } from '.'

const LocationCard: React.FC<CardProps> = props => {
  const [data, setData] = React.useState<any>({country: '', cityCode: ''})
  const {onData}  = props
  React.useEffect(() => onData(data), [data, onData])
  return (
    <CardTemplate {...props}>
      <form>
        <fieldset>
          <legend>Location</legend>
          <label>
            <span>Country</span>
            <br/>
            <select value={data.country} onChange={e => setData({...data, country: e.currentTarget.value})}>
              <option value=''></option>
              <option value='europe'>Europe</option>
              <option value='america'>America</option>
              <option value='africa'>Africa</option>
              <option value='asia'>Asia</option>
              <option value='oceania'>Oceania</option>
            </select>
          </label>
          <label>
            <span>City code</span>
            <br/>
            <input value={data.cityCode} onChange={e => setData({...data, cityCode: e.currentTarget.value})}/>
          </label>
        </fieldset>
      </form>
      {JSON.stringify(data)}
    </CardTemplate>
  )
}

export default LocationCard