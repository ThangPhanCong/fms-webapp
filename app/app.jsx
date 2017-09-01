'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { Route, Router, IndexRoute, hashHistory, browserHistory } = require('react-router');
const Cookie = require('universal-cookie');

let FmsApp = require('FmsApp');
let FmsPageList = require('FmsPageList');
let FmsNavigation = require('FmsNavigation');
let FmsHome = require('FmsHome');
let FmsDashboard = require('FmsDashboard');
let FmsPosts = require('FmsPosts');
let socket = require('Socket');

// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css');
// $(document).foundation();

// App css
require('style!css!sass!applicationStyles');

function requireLogin(nextState, replace) {
	let cookie = new Cookie();
	let jwt = cookie.get('jwt');

	if (jwt) {
		socket.connect(jwt);
	} else {
		replace({
			pathname: '/'
		});
	}
};

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={FmsApp}>
			<Route path="pages" component={FmsPageList} onEnter={requireLogin}/>
			<Route path="posts" component={FmsPosts} onEnter={requireLogin}/>
			<Route path="*" component={FmsDashboard} onEnter={requireLogin}/>
			<IndexRoute component={FmsHome}/>
		</Route>
	</Router>,
	document.getElementById('app')
);
