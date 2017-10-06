'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

let FmsApp = require('FmsApp');

// Load Bootstrap js
require("bootstrapJs");

ReactDOM.render(
	<Router>
		<Route path="/" component={FmsApp}/>
	</Router>,
	document.getElementById('app')
);
