import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Card, CardType } from '../cards'
import BlankCard from '../cards/BlankCard'
import FinalCard from '../cards/FinalCard'
import HouseholdCard from '../cards/HouseholdCard'
import IdentityCard from '../cards/IdentityCard'
import QuestionOtherCard from '../cards/QuestionOtherCard'
import QuestionSymptomCard from '../cards/QuestionSymptomCard'
import SymptomCard from '../cards/SymptomCard'
import { ApplicationState } from '../store'
import { SurveyOne } from '../survey'
import PageTemplate from '../templates/PageTemplate'
import QuestionStillCard from '../cards/QuestionStillCard'

const SurveyView: React.FC<RouteComponentProps> = props => {
  const previousSurvey = useSelector<ApplicationState, any>(state => state.survey)
//  console.log(`Previous survey: ${JSON.stringify(previousSurvey)}`)
//  console.log(`Previous survey answer: ${JSON.stringify(previousSurvey.answer)}`)
  const survey = new SurveyOne([], previousSurvey.answer)
  const [cards, setCards] = React.useState<Card[]>(survey.cards)
  const [currentCard, setCurrentCard] = React.useState<Card>(survey.next)
  const handleMove = (displacement: number) => {
    const survey = new SurveyOne(cards, previousSurvey.answer)
    if (displacement > 0) {
      survey.push(currentCard)
    }
    if (displacement < 0) {
      survey.pop()
    }
    setCards(survey.cards)
    setCurrentCard(survey.next)
  }
  const handleAnswer = (answer: any) => {
    setCurrentCard({ ...currentCard, answer })
  }

  return (
    <PageTemplate {...props}>
      <div>Survey</div>
      {currentCard.type === CardType.Blank && <BlankCard card={currentCard} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Household && <HouseholdCard card={currentCard} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Identity && <IdentityCard card={currentCard} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Symptom && <SymptomCard card={currentCard} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.QuestionSymptom && <QuestionSymptomCard card={currentCard} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.QuestionOther && <QuestionOtherCard card={currentCard} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.QuestionStill && <QuestionStillCard card={currentCard} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Final && <FinalCard card={currentCard} onAnswer={handleAnswer} onMove={handleMove} />}
      <div>Current: {currentCard.type} {JSON.stringify(currentCard.answer)}</div>
      <ul>
        {[...cards].reverse().map((c, index) => {
          return (
            <li key={index.toString()}>{c.type}: {JSON.stringify(c.answer)}</li>
          )
        })}
      </ul>
    </PageTemplate>
  )
}

export default SurveyView
