import React from 'react'
import PageTemplate from '../templates/PageTemplate'
import { RouteComponentProps } from 'react-router'
import { Card, CardType } from '../cards'
import { Survey } from '../survey'
import HouseholdCard from '../cards/HouseholdCard'
import SickCard from '../cards/SickCard'
import IdentityCard from '../cards/IdentityCard'
import SymptomCard from '../cards/SymptomCard'
import OtherSymptomaticCard from '../cards/OtherSymptomaticCard'
import FinalCard from '../cards/FinalCard'

const SurveyView: React.FC<RouteComponentProps> = props => {
  const [cards, setCards] = React.useState<Card[]>([])
  const [survey, setSurvey] = React.useState<Survey>(new Survey(cards))
  const [currentCard, setCurrentCard] = React.useState<Card>(survey.nextCard)
  const handleMove = (displacement: number) => {
    if (displacement > 0){
      const deck = [...cards, currentCard]
      setCards(deck)
      const survey = new Survey(deck)
      setSurvey(survey)
      setCurrentCard(survey.nextCard)
    }
    if (displacement < 0){
      const l = cards.length
      if (l > 0){
        setCards(cards.slice(0, l - 1))
        setCurrentCard({...cards[l - 1]})  
      }
    }
  }
  const handleAnswer = (answer: any) => {
    console.log(`Receiving answer: ${JSON.stringify(answer)}`)
    setCurrentCard({...currentCard, answer})
  }
  const selectDisplayCard = () => {
    switch(currentCard.type){
      case CardType.Household: return <HouseholdCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>
      case CardType.Sick: return <SickCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>
      case CardType.Identity: return <IdentityCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>
      case CardType.Symptom: return <SymptomCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>
      case CardType.OtherSymptomatic: return <OtherSymptomaticCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove}/>
      case CardType.Final: return <FinalCard answer={currentCard.answer} onAnswer={handleAnswer} onMove={handleMove} survey={survey}/>
    }
  }

  return (
    <PageTemplate {...props}>
      <div>Survey</div>
      {selectDisplayCard()}
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
