import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SurveyView from './views/SurveyView';
import { Provider } from 'react-redux';
import { store } from './store';
import survey from './data/survey-1.json'
import LocationCard from './cards/LocationCard';
import HouseholdCard from './cards/HouseholdCard';
import SickCard from './cards/SickCard';
import FinalCard from './cards/FinalCard';
import IdentityCard from './cards/IdentityCard';
import OtherSymptomaticCard from './cards/OtherSymptomaticCard';

function App() {
  React.useEffect(() => {
    store.dispatch({type: 'update-survey', survey})
  }, [])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SurveyView} />
          <Route exact path="/survey/final" component={FinalCard} />
          <Route exact path="/survey/household" component={HouseholdCard} />
          <Route exact path="/survey/identity" component={IdentityCard} />
          <Route exact path="/survey/location" component={LocationCard} />
          <Route exact path="/survey/other-symptomatic" component={OtherSymptomaticCard} />
          <Route exact path="/survey/sick" component={SickCard} />
          <Route render={() => (<div>No match</div>)} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App
