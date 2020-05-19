import { store } from './store'
import { Store } from 'redux'

interface StateMachine {
  forward(): void
}


// le design doit être différent: currentState dans le store
class SurveyOneStateMachine implements StateMachine {
  private currentState: string

  constructor(){
    this.currentState = '/survey/country'
  }

  forward(): void {
    let nextState = '/survey/finish'
    switch(this.currentState){
      case '/survey/country':
        break
    }

  }
}

const survey1 = new SurveyOneStateMachine(store)
