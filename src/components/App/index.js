import React from 'react';
import { HomePage } from '../Home';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <Route path={ROUTES.HOME} component={HomePage} />
  </Router>
);

export default App;