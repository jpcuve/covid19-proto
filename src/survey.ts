import { Card, getDefaultCard, CardType } from "./cards";

export class Survey {
  nextCard: Card = getDefaultCard(CardType.Household)
  state: number = 0
  lastIdentity: any

  household: any = {}
  people: any[] = []

  constructor(cards: Card[]){
    console.log(`Constructing survey, card count: ${cards.length}`)
    let nextType: CardType = this.nextCard.type
    cards.forEach(card => {
      switch(card.type){
        case CardType.Household:
          this.household = card.answer
          nextType = CardType.Sick
          break
        case CardType.Sick:
          nextType = card.answer.sick ? CardType.Identity : CardType.Final
          break
        case CardType.Identity:
          this.lastIdentity = card.answer
          nextType = CardType.Symptom
          break
        case CardType.Symptom:
          this.people.push({
            identity: this.lastIdentity,
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
    this.nextCard = getDefaultCard(nextType)
  }

  getData = () => { return {
    household: this.household,
    people: this.people,
  }}

}
