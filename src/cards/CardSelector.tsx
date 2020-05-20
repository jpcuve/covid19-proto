import React from 'react'
import { Card, CardType } from '.'
import HouseholdCard from './HouseholdCard'
import SickCard from './SickCard'
import IdentityCard from './IdentityCard'
import OtherSymptomaticCard from './OtherSymptomaticCard'
import FinalCard from './FinalCard'
import { Survey } from '../survey'
import SymptomCard from './SymptomCard'

interface CardSelectorProps {
  card: Card,
  survey: Survey,
  handleAnswer: (answer: any) => void,
  handleMove: (displacement: number) => void,
}

const CardSelector: React.FC<CardSelectorProps> = props => {
  const {card, survey, handleAnswer, handleMove } = props
  switch(card.type){
    case CardType.Household: return <HouseholdCard answer={card.answer} onAnswer={handleAnswer} onMove={handleMove}/>
    case CardType.Sick: return <SickCard answer={card.answer} onAnswer={handleAnswer} onMove={handleMove}/>
    case CardType.Identity: return <IdentityCard answer={card.answer} onAnswer={handleAnswer} onMove={handleMove}/>
    case CardType.Symptom: return <SymptomCard answer={card.answer} onAnswer={handleAnswer} onMove={handleMove}/>
    case CardType.OtherSymptomatic: return <OtherSymptomaticCard answer={card.answer} onAnswer={handleAnswer} onMove={handleMove}/>
    case CardType.Final: return <FinalCard answer={card.answer} onAnswer={handleAnswer} onMove={handleMove} survey={survey}/>
  }
}

export default CardSelector