import React, { useEffect } from 'react'
import PageTemplate from '../templates/PageTemplate'
import { RouteComponentProps } from 'react-router'
import { Card, CardType, defaultCard } from '../cards'
import { Survey } from '../survey'
import HouseholdCard from '../cards/HouseholdCard'
import SickCard from '../cards/SickCard'
import IdentityCard from '../cards/IdentityCard'
import SymptomCard from '../cards/SymptomCard'
import OtherSymptomaticCard from '../cards/OtherSymptomaticCard'
import FinalCard from '../cards/FinalCard'
import BlankCard from '../cards/BlankCard'

const SurveyView: React.FC<RouteComponentProps> = props => {
  const [cards, setCards] = React.useState<Card[]>([])
  const [currentCard, setCurrentCard] = React.useState<Card>(defaultCard)
  const handleMove = (displacement: number) => {
    const survey = new Survey(cards)
    if (displacement > 0){
      survey.push(currentCard)
    }
    if (displacement < 0) {
      survey.pop()
    }
    setCards(survey.cards)
    setCurrentCard(survey.next)
  }
  const handleAnswer = (answer: any) => {
    console.log(`Receiving answer: ${JSON.stringify(answer)}`)
    setCurrentCard({...currentCard, answer})
  }
  useEffect(() => handleMove(0), [])

  return (
    <PageTemplate {...props}>
      <div>Survey</div>
      {currentCard.type === CardType.Blank && <BlankCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>}
      {currentCard.type === CardType.Household && <HouseholdCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>}
      {currentCard.type === CardType.Sick && <SickCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>}
      {currentCard.type === CardType.Identity && <IdentityCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>}
      {currentCard.type === CardType.Symptom && <SymptomCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>}
      {currentCard.type === CardType.OtherSymptomatic && <OtherSymptomaticCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>}
      {currentCard.type === CardType.Final && <FinalCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} survey={new Survey(cards)}/>}
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
