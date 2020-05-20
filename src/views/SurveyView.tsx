import React from 'react'
import PageTemplate from '../templates/PageTemplate'
import { RouteComponentProps } from 'react-router'
import { ApplicationState } from '../store'
import { useSelector } from 'react-redux'
import { CardData } from '../cards'
import LocationCard from '../cards/LocationCard'
import HouseholdCard from '../cards/HouseholdCard'
import SickCard from '../cards/SickCard'

const SurveyView: React.FC<RouteComponentProps> = props => {
  const survey = useSelector<ApplicationState, any>(state => state.survey)
  const defaultCard = new CardData('location')
  const [cards, setCards] = React.useState<CardData[]>([defaultCard])
  const lastCard = cards[cards.length - 1]
  const handleMove = (displacement: number) => {
    if (displacement > 0){
      switch(lastCard.type){
        case 'location':
          setCards([...cards, new CardData('household')])
          break;  
        case 'household':
          setCards([...cards, new CardData('sick')])
          break;
      }  
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
    console.log(`Data update: ${JSON.stringify(data)}`)
  }
  const selectCard = (type: string) => {
    switch(type){
      case 'location': return <LocationCard {...props} onMove={handleMove} onData={handleData}/>
      case 'household': return <HouseholdCard {...props} onMove={handleMove} onData={handleData}/>
      case 'sick': return <SickCard {...props} onMove={handleMove} onData={handleData}/>

    }
  }
  return (
    <PageTemplate {...props}>
      <div>Survey</div>
      <button onClick={() => props.history.push('/survey/location')}>Start survey</button>
      {selectCard(lastCard.type)}
    </PageTemplate>
  )
}

export default SurveyView
