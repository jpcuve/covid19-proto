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

export class SurveyOneContinue extends Survey {
  private _previousAnswer: any

  constructor(cards: Card[], previousAnswer: any){
    super(cards)
    this._previousAnswer = previousAnswer
  }

  protected pack(): Card {
    // console.log(`Previous data: ${JSON.stringify(this._previousAnswer)}`)
    const peopleCount: number = this._previousAnswer.people.length
    let lastIdentity: any = {}
    let nextType: CardType = CardType.Blank
    let index: number = 0
    nextType = peopleCount > 0 ? CardType.QuestionStill : CardType.QuestionOther
    this._cards.forEach(card => {
      switch(card.type){
        case CardType.QuestionStill:
          if (card.answer.response){
            nextType = CardType.Symptom
          } else {
            this.data.people = this.data.people || []
            this.data.people.push({
              identity: this._previousAnswer[index],
              symptom: card.answer,
            })
            index++
          }
          if (index >= peopleCount){
            nextType = CardType.QuestionOther
          }
          break
        case CardType.QuestionOther:
          nextType = card.answer.response ? CardType.Identity: CardType.Final
          break
        case CardType.Identity:
          lastIdentity = card.answer
          nextType = CardType.Symptom
          break
        case CardType.Symptom:
          this.data.people = this.data.people || []
          this.data.people.push({
            identity: lastIdentity,
            symptom: card.answer,
          })
          index++    
          nextType = index >= peopleCount ? CardType.QuestionOther : CardType.QuestionStill
          break
      }
    })
    console.log(JSON.stringify(this.data))
    return getDefaultCard(nextType, index < peopleCount ? this._previousAnswer.people[index] : {})
  }
}

export class SurveyOneStart extends Survey {
  protected pack(): Card {
    console.log(`Packing survey, card count: ${this._cards.length}`)
    let nextType: CardType = CardType.Household
    let lastIdentity: any = {}
    this._cards.forEach(card => {
      switch(card.type){
        case CardType.Household:
          this.data.household = card.answer
          nextType = CardType.QuestionSymptom
          break
        case CardType.QuestionSymptom:
          nextType = card.answer.response ? CardType.Identity : CardType.Final
          break
        case CardType.Identity:
          lastIdentity = card.answer
          nextType = CardType.Symptom
          break
        case CardType.Symptom:
          this.data.people = this.data.people || []
          this.data.people.push({
            identity: lastIdentity,
            symptom: card.answer,
          })
          nextType = CardType.QuestionOther
          break
        case CardType.QuestionOther:
          nextType = card.answer.response ? CardType.Identity : CardType.Final
          break
      }
    })
    return getDefaultCard(nextType)
  }
}
