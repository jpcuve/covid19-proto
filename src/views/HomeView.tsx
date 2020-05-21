import React from 'react'
import { RouteComponentProps } from 'react-router'
import PageTemplate from '../templates/PageTemplate'

const HomeView: React.FC<RouteComponentProps> = props => {
    const {history} = props
    const [surveyName, setSurveyName] = React.useState<string>('')
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const res = await fetch('./data/survey-1.json')
        const survey = await res.text()
        console.log(survey)
        // load previous survey in redux store
        history.push('/survey')
    }
    return (
        <PageTemplate {...props}>
            <div>Select previous survey name, or start a new survey</div>
            <form noValidate onSubmit={handleSubmit}>
                <label>
                    <span>Survey name</span>
                    <br/>
                    <input value={surveyName} onChange={e => setSurveyName(e.currentTarget.value)}/>
                </label>
                <button type='submit'>Start</button>
            </form>
        </PageTemplate>
    )
}

export default HomeView