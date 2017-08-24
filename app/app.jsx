var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');
var FmsApp = require('FmsApp');
var FmsLogin = require('FmsLogin');
var FmsPageList = require('FmsPageList');
var Cookie = require('universal-cookie');

// Load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

function requireLogin(nextState, replace) {
	let cookie = new Cookie();
	let jwt = cookie.get('jwt');
	if (!jwt) {
		replace({
			pathname: '/login'
		});
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={FmsApp} onEnter={requireLogin}>
			<IndexRoute component={FmsPageList} />
		</Route>
		<Route path="/login" component={FmsLogin} />
	</Router>,
	document.getElementById('app')
);
