import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './view/home';
import MyTheme from './components/theme';

export default function App(): JSX.Element {
  return (
    <>
      <Router>
        <MyTheme>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/article/:aid">222</Route>
          </Switch>
        </MyTheme>
      </Router>
    </>
  );
}
