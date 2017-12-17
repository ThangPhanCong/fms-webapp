import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'url-search-params-polyfill';
import TestComponent from './components/main/TestComponents'
import FmsButtonTest from './components/FmsButton/FmsButtonTest'
import FmsLoadingTest from './components/FmsLoading/FmsLoading'
import FmsToolTipTest from './components/FmsToolTip/FmsToolTip'

import {configure} from './store/configureStore';
import FmsApp from './pages/FmsApp';

const store = configure();

// Load Bootstrap js
require("bootstrapJs");

//Load Css js
require('../app/composeCss')

ReactDOM.render(
	<Router>
		<Switch>
			<Route path='/test' component ={TestComponent} />
		</Switch>
	</Router>
		,
	document.getElementById('app-test')
);
