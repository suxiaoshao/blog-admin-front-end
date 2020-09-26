import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './view/home';

export default function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/article/:aid">222</Route>
        </Switch>
      </Router>
    </>
  );
}
