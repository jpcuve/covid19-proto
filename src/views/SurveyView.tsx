import React from 'react'
import PageTemplate from '../templates/PageTemplate'
import { RouteComponentProps } from 'react-router'
import { ApplicationState } from '../store'
import { useSelector } from 'react-redux'

const SurveyView: React.FC<RouteComponentProps> = props => {
  const survey = useSelector<ApplicationState, any>(state => state.survey)
  return (
    <PageTemplate {...props}>
      <div>Survey</div>
      <button onClick={() => props.history.push('/survey/location')}>Start survey</button>
    </PageTemplate>
  )
}

export default SurveyView
