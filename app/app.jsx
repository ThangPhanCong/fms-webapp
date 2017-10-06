'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
// const { Route, Router, IndexRoute, browserHistory } = require('react-router');
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from 'store';

let FmsApp = require('FmsApp');
let FmsPageList = require('FmsPageList');
let FmsNavigation = require('FmsNavigation');
let FmsHome = require('FmsHome');
let FmsDashboard = require('FmsDashboard');
let FmsPosts = require('FmsPosts');
let FmsProject = require('FmsProject');
let FmsSettings = require('FmsSettings');

import tokenApi from 'TokenApi';

let config = require('CONFIG');
let socket = require('Socket');

// Load Bootstrap js
require("bootstrapJs");

// function requireLogin(nextState, replace) {
// 	let jwt = store.get('jwt');
//
// 	if (jwt) {
// 		tokenApi.verifyAccessToken(jwt)
// 			.then(userData => {
// 				socket.connect(config.BASE_URL, jwt);
// 			})
// 			.catch(err => {
// 				replace({
// 					pathname: '/'
// 				});
// 			})
// 	} else {
// 		replace({
// 			pathname: '/'
// 		});
// 	}
// };

const NoMatch = () => {
	return (
		<div>Not match</div>
	)
}

ReactDOM.render(
	<Router>
		<Switch>
			<Route path="/" component={FmsApp}/>
		</Switch>

			{
				// <Route path="/pages" component={FmsPageList} onEnter={requireLogin}/>
				// <Route path="/posts" component={FmsPosts} onEnter={requireLogin}/>
				// <Route path="/projects/:alias" component={FmsDashboard} onEnter={requireLogin}/>
				// <Route path="/projects/:alias/posts" component={FmsPosts} onEnter={requireLogin}/>
				// <Route path="/projects/:alias/settings" component={FmsSettings} onEnter={requireLogin}/>
				// <IndexRoute component={FmsHome}/>
			}
	</Router>,
	document.getElementById('app')
);
