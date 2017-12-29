import 'jquery';
import 'metismenu';
import 'bootstrap';
import './assets/js/jquery.scrollbar';

import 'url-search-params-polyfill';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './assets/styles/animate.css'


// app theme
importAll(require.context('././', true, /\.scss$/));


function importAll(r) {
    r.keys().forEach(r);
}