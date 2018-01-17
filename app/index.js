import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import '../app/composeAssets';

import {configure} from './store/configureStore';
import FmsApp from './containers/FmsApp';

const store = configure();


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={FmsApp}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
