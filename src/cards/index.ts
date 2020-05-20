export class CardData {
  public type: string
  public data: any

  constructor(type: string, data: any = {}){
    this.type = type
    this.data = data
  }
}

export interface CardProps {
  onMove: (displacement: number) => void
  onData: (data: any) => void
}