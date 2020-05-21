import React from 'react'
import { RouteComponentProps } from 'react-router'
import PageTemplate from '../templates/PageTemplate'
import surveys from '../data/surveys.json'
import { useDispatch } from 'react-redux'

const HomeView: React.FC<RouteComponentProps> = props => {
    const {history} = props
    const [surveyIndex, setSurveyIndex] = React.useState<number>(0)
    const dispatch = useDispatch()
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const survey: any = surveys[surveyIndex]
        console.log(survey)
        dispatch({type: 'update-survey', survey})
        history.push('/survey')
    }
    return (
        <PageTemplate {...props}>
            <div>Select previous survey</div>
            <form noValidate onSubmit={handleSubmit}>
                <label>
                    <span>Survey name</span>
                    <br/>
                    <select value={surveyIndex} onChange={e => setSurveyIndex(+e.currentTarget.value)}>
                        {surveys.map((survey: any, index: number) => <option key={index.toString()} value={index.toString()}>{survey.name}</option>)}
                    </select>
                </label>
                <button type='submit'>Start</button>
            </form>
        </PageTemplate>
    )
}

export default HomeView