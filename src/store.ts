import { AnyAction, createStore } from "redux"

export interface ApplicationState {
  fetching: boolean,
  errors: string[],
  survey: any;
}

const defaultApplicationState: ApplicationState = {
  fetching: false,
  errors: [],
  survey: {}
}

const rootReducer = (state: ApplicationState = defaultApplicationState, action: AnyAction) => {
  console.log(`Reducer is called, state: ${JSON.stringify(state)} action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case 'update-fetching':
      return { ...state, fetching: action.fetching }
    case 'update-errors':
      return { ...state, errors: action.errors }
    case 'update-survey':
      return {...state, survey: action.survey }
  }
  return state
}

export const store = createStore(rootReducer, defaultApplicationState)
