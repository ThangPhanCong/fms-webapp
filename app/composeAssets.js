import 'jquery';
import 'metismenu';
import 'bootstrap';
import './assets/js/jquery.scrollbar';

import 'url-search-params-polyfill';

import './../node_modules/font-awesome/css/font-awesome.css'

// app theme
import './assets/styles/app.scss'
importAll(require.context('./commons', true, /\.scss$/));
importAll(require.context('./containers', true, /\.scss$/));


function importAll(r) {
    r.keys().forEach(r);
}