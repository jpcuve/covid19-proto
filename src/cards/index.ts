export enum CardType {
  Blank = 'blank',
  Household = 'household',
  QuestionSymptom = 'questionSymptom',
  Identity = 'identity',
  Symptom = 'symptom',
  QuestionOther = 'questionOther',
  QuestionStill = 'questionStill',
  Final = 'final',
}


export interface Extra {
  identity?: any,
  survey?: any,
}

export class Card {
  type: CardType
  answer: any
  extra: Extra

  constructor(type: CardType, answer: any = {}, extra: Extra = {}){
    this.type = type
    this.answer = answer
    this.extra = extra
  }
}

export const defaultCard = new Card(CardType.Blank)

export interface CardProps {
  card: Card,
  onAnswer: (answer: any) => void
  onMove: (displacement: number) => void
}

export function getDefaultCard(type: CardType, extra: Extra = {}) {
  switch(type){
    case CardType.Blank: return new Card(type, {}, extra)
    case CardType.Household: return new Card(type, {country: '', cityCode: '', householdSize: 0}, extra)
    case CardType.QuestionSymptom: return new Card(type, {response: null}, extra)
    case CardType.Identity: return new Card(type, {initials: '', ageRange: ''}, extra)
    case CardType.Symptom: return new Card(type, {test: ''}, extra)
    case CardType.QuestionOther: return new Card(type, {response: null}, extra)
    case CardType.QuestionStill: return new Card(type, {response: null}, extra)
    case CardType.Final: return new Card(type, {}, extra)
  }
}