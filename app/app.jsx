var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory, browserHistory } = require('react-router');
var FmsApp = require('FmsApp');
var FmsLogin = require('FmsLogin');
var FmsPageList = require('FmsPageList');
var Cookie = require('universal-cookie');
var FmsNavigation = require('FmsNavigation');
var FmsHome = require('FmsHome');

// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css');
// $(document).foundation();

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
};

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={FmsApp}>
			<Route path="pages" component={FmsPageList}/>
			<IndexRoute component={FmsHome}/>
		</Route>
	</Router>,
	document.getElementById('app')
);
