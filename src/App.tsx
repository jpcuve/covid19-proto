import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SurveyView from './views/SurveyView';
import { Provider } from 'react-redux';
import { store } from './store';
import survey from './data/survey-1.json'

function App() {
  React.useEffect(() => {
    store.dispatch({type: 'update-survey', survey})
  }, [])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SurveyView} />
          <Route render={() => (<div>No match</div>)} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App
