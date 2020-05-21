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

export class Card {
  type: CardType
  answer: any

  constructor(type: CardType, answer: any = {}){
    this.type = type
    this.answer = answer
  }
}

export const defaultCard = new Card(CardType.Blank, {})

export interface CardProps {
  answer: any,
  onAnswer: (answer: any) => void
  onMove: (displacement: number) => void
}

export function getDefaultCard(type: CardType, extra: any = {}) {
  switch(type){
    case CardType.Blank: return new Card(type, extra)
    case CardType.Household: return new Card(type, {...extra, country: '', cityCode: '', householdSize: 1})
    case CardType.QuestionSymptom: return new Card(type, {...extra, response: null})
    case CardType.Identity: return new Card(type, {...extra, initials: '', ageRange: ''})
    case CardType.Symptom: return new Card(type, {...extra, test: ''})
    case CardType.QuestionOther: return new Card(type, {...extra, response: null})
    case CardType.QuestionStill: return new Card(type, {...extra, response: null})
    case CardType.Final: return new Card(type, {...extra})
  }
}