import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import { Provider } from 'react-redux';
// import store from './store';


import "./App.css";

import Landing from "./components/landing";
import confirmPromo from "./components/confirmPromo";
import PromoEmail from "./components/promoEmail";
import DownloadPromo from "./components/downloadPromo";
import ExtraInfo from "./components/extraInfo";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Route exact path="/:companyId/:promotionId" component={Landing} />
          <Route exact path="/confirmPromo/:companyId/:promotionId/:email/:phoneNo" component={confirmPromo} />
          <Route exact path="/extraInfo/promo/:promotionId/email/:email" component={ExtraInfo} />
          <Route exact path="/promo/:promotionId/email/:email" component={PromoEmail} />
          <Route exact path="/getPromo" component={DownloadPromo} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
