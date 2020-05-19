import React from 'react'
import { RouteComponentProps } from "react-router"
import { ApplicationState } from '../store'
import { useSelector } from 'react-redux'

const PageTemplate: React.FC<RouteComponentProps> = props => {
  const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
  const errors = useSelector<ApplicationState, string[]>(state => state.errors)
  return (
    <>
      <div>
        {fetching && <span>Fetching</span>}
        {errors.length > 0 && <span>{JSON.stringify(errors)}</span>}
      </div>
      <div>
        {props.children}
      </div>
    </>
  )
}

export default PageTemplate