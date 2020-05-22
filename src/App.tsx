import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SurveyView from './views/SurveyView';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeView from './views/HomeView';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomeView} />
          <Route path='/home' component={HomeView}/>
          <Route path='/survey' component={SurveyView}/>
          <Route render={() => (<div>404</div>)} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App
