import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './view/home';
import MyTheme from './components/common/theme';
import './style/app.scss';
import Edit from './view/edit';
import Login from './view/login';

export default function App(): JSX.Element {
  return (
    <>
      <Router>
        <MyTheme>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/edit/:aid">
              <Edit />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </MyTheme>
      </Router>
    </>
  );
}
