import React from 'react';
import './App.css';

import {
  Switch,
  Route,
} from 'react-router-dom';
import QuestionsPage from "./Components/Pages/QuestionsPage";
import StartPage from "./Components/Pages/StartPage";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="decoration">
          <img alt="banner - Quiz Mania" src='assets/images/bannertext.png' />
        </div>
      </header>
        <div>
          <Switch>
            <Route path="/asnwerQuestions">
              <QuestionsPage  />
            </Route>
            <Route path="/">
              <StartPage />
            </Route>
          </Switch>
        </div>
    </div>
  );
}

export default App;
