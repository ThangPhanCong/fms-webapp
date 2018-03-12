import 'jquery';
import 'metismenu';
import 'bootstrap';
import './assets/js/jquery.scrollbar';

import 'url-search-params-polyfill';

import './../node_modules/font-awesome/css/font-awesome.css'
import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';

// app theme
import './assets/styles/app.scss'
importAll(require.context('./commons', true, /\.scss$/));
importAll(require.context('./containers', true, /\.scss$/));


function importAll(r) {
    r.keys().forEach(r);
}