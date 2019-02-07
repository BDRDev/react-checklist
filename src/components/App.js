import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';

import { HashRouter, Route } from 'react-router-dom';

//All component imports
import Navigation from './Navigation';

import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import HomePage from './Home';

import NewChecklist from './NewChecklist';
import Checklist from './Checklist';
import NewStep from './NewStep';

import * as routes from '../constants/routes';






const App = () =>



  <HashRouter>
  	<div className="fullPage">
	    <Navigation />

	    <hr />

	    <Route 
	    	exact path={routes.LANDING}
	    	component={LandingPage}
    	/>

    	<Route 
    		exact path={routes.SIGN_UP}
    		component={SignUpPage}
    	/>

    	<Route 
    		exact path={routes.SIGN_IN}
    		component={SignInPage}
    	/>

    	<Route 
    		exact path={routes.HOME}
    		component={HomePage}
    	/>

        <Route
            exact path={routes.NEW_CHECKLIST}
            component={NewChecklist}
        />

        <Route
            exact path={routes.CHECKLIST}
            component={Checklist}
        />

        <Route
            exact path={routes.NEW_STEP}
            component={NewStep}
        />

	</div>	
  </HashRouter>

export default App;