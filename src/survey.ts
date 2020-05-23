import { Card, getDefaultCard, CardType } from "./cards"


abstract class Survey {
  protected _cards: Card[]
  protected _next?: Card
  readonly data: any = {}

  constructor(cards: Card[]){
    this._cards = cards
  }

  push(card: Card) {
    this._cards.push(card)
    this._next = this.pack()
  }

  pop() {
    const card = this._cards.pop()
    if (card){
      this._next = this.pack()
    }
  }

  get cards(): Card[] {
    return this._cards
  }

  get next(): Card {
    this._next = this._next || this.pack()
    return this._next
  }
  
  protected abstract pack(): Card
}


export class SurveyOne extends Survey {
  private _previous: any
  private _isFirstSurvey: boolean
  private _personCount: number
  private _extra: any

  constructor(cards: Card[], previous: any = {}){
    super(cards)
    this._previous = previous
    this._isFirstSurvey = Object.keys(this._previous).length === 0
    this._personCount = this._isFirstSurvey ? 0 : this._previous.people.length
    this._extra = {}
    this.data.people = this.data.people || []
  }

  private follow(personIndex: number): CardType {
    if (personIndex >= this._personCount){
      return CardType.QuestionOther
    }
    this.data.people.push(this._previous.people[personIndex])
    this._extra = {initials: this.data.people[this.data.people.length - 1].identity.initials}
    return CardType.QuestionStill
  }

  protected pack(): Card {
    let personIndex = 0
    let nextType: CardType = this._isFirstSurvey ? CardType.Household : this.follow(personIndex)
    this._cards.forEach(card => {
      switch(card.type){
        case CardType.QuestionStill:
          if (card.answer.response){
            this._extra = {identity: card.answer.identity}
            nextType = CardType.Symptom
          } else {
            this.data.people[this.data.people.length - 1].symptom = card.answer
            personIndex++
            nextType = this.follow(personIndex)
          }
          break
        case CardType.Household:
          this.data.household = card.answer
          nextType = CardType.QuestionSymptom
          break
        case CardType.QuestionSymptom:
          if (card.answer.response){
            this.data.people.push({})
            nextType = CardType.Identity
          } else {
            this._extra = {survey: this.data}
            nextType = CardType.Final
          }
          break
        case CardType.Identity:
          this.data.people[this.data.people.length - 1].identity = card.answer
          nextType = CardType.Symptom
          break
        case CardType.Symptom:
          this.data.people[this.data.people.length - 1].symptom = card.answer
          personIndex++
          nextType = this.follow(personIndex)
          break
        case CardType.QuestionOther:
          if (card.answer.response){
            this.data.people.push({})
            nextType = CardType.Identity
          } else {
            this._extra = {survey: this.data}
            nextType = CardType.Final
          }
          break
      }
    })
    return getDefaultCard(nextType, this._extra)
  }
}
