import { RouteComponentProps } from "react-router";

export class CardData implements CardData {
  public type: string

  constructor(type: string){
    this.type = type
  }
}

export interface CardProps {
  onMove: (displacement: number) => void
  onData: (data: any) => void
}