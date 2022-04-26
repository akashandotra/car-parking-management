import { initializeIcons } from "@fluentui/react";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Login/Login";
import "./cssReset.css";
class App extends React.Component {
  constructor(props: any) {
    super(props);
    initializeIcons();
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;
