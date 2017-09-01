var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory, browserHistory } = require('react-router');
var FmsApp = require('FmsApp');
var FmsPageList = require('FmsPageList');
var Cookie = require('universal-cookie');
var FmsNavigation = require('FmsNavigation');
var FmsHome = require('FmsHome');
var FmsDashboard = require('FmsDashboard');
var FmsPosts = require('FmsPosts');

let socket = require('Socket');

// Load boostrap
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
