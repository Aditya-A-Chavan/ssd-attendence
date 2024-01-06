import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './authentication/registration';

const Routes_1 = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/SignUp" component={SignUp} />
        {/* Add more routes as needed */}
        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        {/* <Route exact path="/profile" component={UserProfile} /> */}
        {/* Additional routes for other pages */}
      </Routes>
    </Router>
  );
};

export default Routes_1;
