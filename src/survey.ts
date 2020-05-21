import { Card, getDefaultCard, CardType } from "./cards";

export class Survey {
  cards: Card[]
  next: Card
  data: any = {
    people: []
  }

  constructor(cards: Card[]){
    this.cards = cards
    this.next = this.pack()
  }

  push(card: Card) {
    this.cards.push(card)
    this.next = this.pack()
  }

  pop() {
    const card = this.cards.pop()
    if (card){
      this.next = this.pack()
    }
  }

  private pack(): Card {
    console.log(`Packing survey, card count: ${this.cards.length}`)
    let nextType: CardType = CardType.Household
    let lastIdentity: any = {}
    this.cards.forEach(card => {
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
