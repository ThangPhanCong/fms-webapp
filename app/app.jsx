

import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'url-search-params-polyfill';

import {configure} from './store/configureStore';

const store = configure();

let FmsApp = require('FmsApp');

// Load Bootstrap js
require("bootstrapJs");

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={FmsApp}/>
		</Router>
	</Provider>,
	document.getElementById('app')
);
