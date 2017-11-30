import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'url-search-params-polyfill';

import {configure} from './store/configureStore';
import FmsApp from './pages/FmsApp';

const store = configure();

// Load Bootstrap js
require("bootstrapJs");

console.log('test ok men');

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={FmsApp}/>
		</Router>
	</Provider>,
	document.getElementById('app')
);
