import { Card, getDefaultCard, CardType, Extra } from "./cards"


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
  private previous: any
  private isFirstSurvey: boolean
  private personCount: number
  private extra: Extra

  constructor(cards: Card[], previous: any = {}, pack = false){
    super(cards)
    this.previous = previous
    this.isFirstSurvey = Object.keys(this.previous).length === 0
    this.personCount = this.isFirstSurvey ? 0 : this.previous.people.length
    this.extra = {}
    this.data.people = this.data.people || []
  }

  private follow(personIndex: number): CardType {
    if (personIndex >= this.personCount){
      return CardType.QuestionOther
    }
    this.data.people.push(this.previous.people[personIndex])
    this.extra = {identity: this.data.people[this.data.people.length - 1].identity}
    return CardType.QuestionStill
  }

  protected pack(): Card {
    let personIndex = 0
    let nextType: CardType = this.isFirstSurvey ? CardType.Household : this.follow(personIndex)
    this._cards.forEach(card => {
      switch(card.type){
        case CardType.QuestionStill:
          if (card.answer.response){
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
            nextType = CardType.Recap
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
            nextType = CardType.Recap
          }
          break
        case CardType.Recap:
          break
      }
    })
    this.extra = {...this.extra, survey: this.data}
    return getDefaultCard(nextType, this.extra)
  }
}
