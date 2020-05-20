import React from 'react'
import PageTemplate from '../templates/PageTemplate'
import { RouteComponentProps } from 'react-router'
import { CardData } from '../cards'
import LocationCard from '../cards/LocationCard'
import HouseholdCard from '../cards/HouseholdCard'
import SickCard from '../cards/SickCard'
import FinalCard from '../cards/FinalCard'

const SurveyView: React.FC<RouteComponentProps> = props => {
  const defaultCard = new CardData('location')
  const [cards, setCards] = React.useState<CardData[]>([defaultCard])
  const lastCard = cards[cards.length - 1]
  const handleMove = (displacement: number) => {
    if (displacement > 0){
      let nextType: string = 'final'
      switch(lastCard.type){
        case 'location':
          nextType = 'household'
          break;  
        case 'household':
          nextType = 'sick'
          break;
      }
      setCards([...cards, new CardData(nextType)])
    }
    if (displacement < 0){
      const newCards = [...cards]
      for (let i = 0; i < -displacement; i++){
        if (cards.length > 1){
          newCards.pop()
        }
      }
      setCards(newCards)
    }
  }
  const handleData = (data: any) => {
    lastCard.data = data
  }
  const selectCard = (type: string) => {
    switch(type){
      case 'location': return <LocationCard {...props} onMove={handleMove} onData={handleData}/>
      case 'household': return <HouseholdCard {...props} onMove={handleMove} onData={handleData}/>
      case 'sick': return <SickCard {...props} onMove={handleMove} onData={handleData}/>
      case 'final': return <FinalCard {...props} onMove={handleMove} onData={handleData}/>
    }
  }
  return (
    <PageTemplate {...props}>
      <div>Survey</div>
      <button onClick={() => props.history.push('/survey/location')}>Start survey</button>
      {selectCard(lastCard.type)}
      <ul>
        {cards.map(card => {
          return (
          <li>{card.type}: {JSON.stringify(card.data)}</li>
          )
        })}
      </ul>
    </PageTemplate>
  )
}

export default SurveyView
