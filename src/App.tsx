import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            111
          </Route>
          <Route path="/article/:aid">222</Route>
        </Switch>
      </Router>
    </>
  );
}
