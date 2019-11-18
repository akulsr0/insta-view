import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import DPDown from './DPDownView'
import LikeCountView from './LikeCountView'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DPDown} />
          <Route path="/dp-download" component={DPDown} />
          <Route path="/check-likes" component={LikeCountView} />
        </Switch>
      </BrowserRouter>
    )
  }
}
