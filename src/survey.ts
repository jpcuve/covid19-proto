import { Card, getDefaultCard, CardType } from "./cards"


abstract class Survey {
  protected _cards: Card[]
  protected _next: Card|undefined
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

  constructor(cards: Card[], previous: any = {}){
    super(cards)
    this._previous = previous
  }

  protected pack(): Card {
    const isFirstSurvey: boolean = Object.keys(this._previous).length === 0
    const isSomebodyWithSymptoms: boolean = !isFirstSurvey && this._previous.people.length > 0
    const personCount = isSomebodyWithSymptoms ? this._previous.people.length : 0
    let personIndex = 0
    let nextType: CardType
    let extra = {}
    this.data.people = this.data.people || []
    if (isFirstSurvey){
      nextType = CardType.Household
    } else {
      if (personIndex >= personCount){
        nextType = CardType.QuestionOther
      } else {
        this.data.people.push(this._previous.people[personIndex])
        nextType = CardType.QuestionStill
        extra = {initials: this.data.people[this.data.people.length - 1].identity.initials}
      }
    }
    this._cards.forEach(card => {
      switch(card.type){
        case CardType.QuestionStill:
          if (card.answer.response){
            nextType = CardType.Symptom
            extra = {identity: card.answer.identity}
          } else {
            this.data.people[this.data.people.length - 1].symptom = card.answer
            personIndex++
            if (personIndex >= personCount){
              nextType = CardType.QuestionOther
            } else {
              this.data.people.push(this._previous.people[personIndex])
              nextType = CardType.QuestionStill
              extra = {initials: this.data.people[this.data.people.length - 1].identity.initials}
            }
          }
          break
        case CardType.Household:
          this.data.household = card.answer
          nextType = CardType.QuestionSymptom
          break
        case CardType.QuestionSymptom:
          if (card.answer.response){
            this.data.people = this.data.people || []
            this.data.people.push({})
            nextType = CardType.Identity
          } else {
            nextType = CardType.Final
            extra = {survey: this.data}
          }
          break
        case CardType.Identity:
          this.data.people[this.data.people.length - 1].identity = card.answer
          nextType = CardType.Symptom
          break
        case CardType.Symptom:
          this.data.people[this.data.people.length - 1].symptom = card.answer
          personIndex++
          if (personIndex >= personCount){
            nextType = CardType.QuestionOther
          } else {
            this.data.people.push(this._previous.people[personIndex])
            nextType = CardType.QuestionStill
            extra = {initials: this.data.people[this.data.people.length - 1].identity.initials}
          }
          break
        case CardType.QuestionOther:
          if (card.answer.response){
            this.data.people.push({})
            nextType = CardType.Identity
          } else {
            nextType = CardType.Final
            extra = {survey: this.data}
          }
          break
      }
    })
    return getDefaultCard(nextType, extra)
  }
}
