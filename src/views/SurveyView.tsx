import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Card, CardType } from '../cards'
import BlankCard from '../cards/BlankCard'
import FinalCard from '../cards/FinalCard'
import HouseholdCard from '../cards/HouseholdCard'
import IdentityCard from '../cards/IdentityCard'
import OtherSymptomaticCard from '../cards/OtherSymptomaticCard'
import SickCard from '../cards/SickCard'
import SymptomCard from '../cards/SymptomCard'
import { ApplicationState } from '../store'
import { SurveyOneStart, SurveyOneContinue } from '../survey'
import PageTemplate from '../templates/PageTemplate'

const SurveyView: React.FC<RouteComponentProps> = props => {
  const data = useSelector<ApplicationState, any>(state => state.survey)
  console.log(`Previous survey data: ${JSON.stringify(data)}`)
  const survey = new SurveyOneContinue([], {})
  const [cards, setCards] = React.useState<Card[]>(survey.cards)
  const [currentCard, setCurrentCard] = React.useState<Card>(survey.next)
  const handleMove = (displacement: number) => {
    const survey = new SurveyOneStart(cards)
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
      {currentCard.type === CardType.Blank && <BlankCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Household && <HouseholdCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Sick && <SickCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Identity && <IdentityCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Symptom && <SymptomCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.OtherSymptomatic && <OtherSymptomaticCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} />}
      {currentCard.type === CardType.Final && <FinalCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} survey={new SurveyOneStart(cards)} />}
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
