export enum CardType {
  Household = 'household',
  Sick = 'sick',
  Identity = 'identity',
  Symptom = 'symptom',
  OtherSymptomatic = 'otherSymptomatic',
  Final = 'final',
}

export class Card {
  type: CardType
  answer: any

  constructor(type: CardType, answer: any = {}){
    this.type = type
    this.answer = answer
  }

  toString = () => `${this.type}: ${JSON.stringify(this.answer)}`
}

export interface CardProps {
  answer: any,
  onAnswer: (answer: any) => void
  onMove: (displacement: number) => void
}

export const getDefaultCard: (type: CardType) => Card = type => {
  switch(type){
    case CardType.Household: return new Card(type, {country: '', cityCode: '', householdSize: 1})
    case CardType.Sick: return new Card(type, {sick: null})
    case CardType.Identity: return new Card(type, {initials: '', ageRange: ''})
    case CardType.Symptom: return new Card(type, {test: ''})
    case CardType.OtherSymptomatic: return new Card(type, {otherSymptomatic: null})
    case CardType.Final: return new Card(type, {})
  }
}