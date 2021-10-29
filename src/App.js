import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './Dashboard'
import Login from './Login'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


