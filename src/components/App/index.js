import React from 'react';
import { LandingPage } from '../Landing';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <Route path={ROUTES.LANDING} component={LandingPage} />
  </Router>
);

export default App;