import 'jquery';
import 'metismenu';
import 'bootstrap';

import 'url-search-params-polyfill';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './assets/js/pace'

// app theme
import('./assets/styles/app.scss');
importAll(require.context('././', true, /\.scss$/));


function importAll(r) {
    r.keys().forEach(r);
}