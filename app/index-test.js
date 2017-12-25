import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'url-search-params-polyfill';
import TestComponent from './commons/test/TestComponents'
import FmsButtonTest from './commons/FmsButton/FmsButtonTest'
import FmsLoadingTest from './commons/FmsLoading/FmsLoading'
import FmsToolTipTest from './commons/FmsToolTip/FmsToolTip'

import {configure} from './store/configureStore';
import FmsApp from './containers/FmsApp';

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
