import { Card, getDefaultCard, CardType } from "./cards"


abstract class Survey {
  protected _cards: Card[]
  protected _next: Card
  readonly data: any = {}

  constructor(cards: Card[]){
    this._cards = cards
    this._next = this.pack()
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
    return this._next
  }
  
  protected abstract pack(): Card
}

export class SurveyOneContinue extends Survey {
  constructor(cards: Card[], previousData: any){
    super(cards)
  }

  protected pack(): Card {
    let nextType: CardType = CardType.Blank
    return getDefaultCard(nextType)
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
          nextType = CardType.Sick
          break
        case CardType.Sick:
          nextType = card.answer.sick ? CardType.Identity : CardType.Final
          break
        case CardType.Identity:
          lastIdentity = card.answer
          nextType = CardType.Symptom
          break
        case CardType.Symptom:
          this.data.people.push({
            identity: lastIdentity,
            symptom: card.answer,
          })
          nextType = CardType.OtherSymptomatic
          break
        case CardType.OtherSymptomatic:
          nextType = card.answer.otherSymptomatic ? CardType.Identity : CardType.Final
          break
        case CardType.Final:
          break  
      }
    })
    return getDefaultCard(nextType)
  }
}
