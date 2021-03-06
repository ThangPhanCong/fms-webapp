import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'url-search-params-polyfill';
import TestComponent from './commons/test/TestComponents'

import './composeAssets';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/test' component={TestComponent}/>
        </Switch>
    </Router>,
    document.getElementById('app-test')
);
