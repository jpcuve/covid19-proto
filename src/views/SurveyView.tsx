import React from 'react'
import PageTemplate from '../templates/PageTemplate'
import { RouteComponentProps } from 'react-router'
import { Card } from '../cards'
import { Survey } from '../survey'
import CardSelector from '../cards/CardSelector'

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
  return (
    <PageTemplate {...props}>
      <div>Survey</div>
      <CardSelector card={currentCard} survey={survey} handleAnswer={handleAnswer} handleMove={handleMove} />
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
